import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '../../lib/supabase';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

type GetBeers = {
    name: string;
    degree: string;
    ibu: number | null;
    type: string | null;
};
const getBeers = async (supabase: SupabaseClient): Promise<GetBeers[]> => {
    const { data: beers, error } = await supabase
        .from('beers')
        .select(`name, degree_integer, degree_decimal, ibu, type, editions(name)`)
        .eq('editions.active', true)
        .eq('displayonstats', true);

    if (error) {
        console.error('Error fetching beers:', error);
        return [];
    }
    console.log('Fetched beers:', beers);

    return beers.map((b) => ({
        name: b.name,
        degree: `${b.degree_integer}.${b.degree_decimal}`,
        ibu: b.ibu,
        type: b.type,
    }));
};

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const beers = await getBeers(await createClient());
    console.log('Beers: ', JSON.stringify(beers));
    console.log('# Messages: ', messages.length);

    const result = streamText({
        model: openai('gpt-5-nano'),
        messages: convertToModelMessages(messages),
        system: `Nous sommes à un événement autour de la bière. Nous avons une carte avec une sélection de bières. 
        Les bières disponibles sont dans le JSON suivants (nom, degré d'alcool, IBU, type) : ${JSON.stringify(
            beers
        )}.

        Tu dois aider les clients à choisir une bière en fonction de leurs goûts et préférences. 
        Pour cela, c'est toi qui va poser les questions au client, en donnant un choix multiple en guise de réponse. 
        Tu dois itérer les questions jusqu'à ce que tu aies suffisamment d'informations pour proposer une (et UNE SEULE) bière adaptée.

        Sois amical et professionnel, comme un vrai barman mais évite d'être trop technique dans tes questions.
        
        Il est IMPORTANT que tu ne pose pas une question en donnant des bières comme réponse. Il faut guider le client.`,
    });

    return result.toUIMessageStreamResponse();
}

/*
import { streamText, generateObject, UIMessage, convertToModelMessages } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Schéma pour les options
const optionsSchema = z.object({
    options: z.array(
        z.object({
            id: z.string(),
            label: z.string(),
            description: z.string().optional(),
            category: z.string().optional(),
        })
    ),
});

export async function POST(req: Request) {
    const MODEL = 'gpt-5-nano'; // Modèle principal pour les réponses
    try {
        const { messages }: { messages: UIMessage[] } = await req.json();

        // Générer la réponse principale
        const result = await streamText({
            model: openai(MODEL),
            messages: convertToModelMessages(messages),
            system: `Tu es un barman expert en bière, aidant les clients à choisir leur bière à la Brassicole. Il n'y a pas de repas. 
                Les bières disponibles sont : 
                - Triple Karmeliet
                - Chimay Bleue
                - Kriek Boon
                - Pecheresse
                - Ardenne Saison
                - Urine
                - Mobius IPA
                - Houppe
                - Grizette fruit des bois
                - Orval
                - Trotinette
                - Galopin (assortiment de 4 bières fixes pour dégustation)
            
                IMPORTANT: Après chaque réponse, tu dois proposer des options de suivi logiques.
                Ces options doivent être pertinentes au contexte de la conversation.
            
                Format tes réponses normalement, sans mentionner les options dans le texte principal.`,

            // Callback pour générer les options après la réponse
            onFinish: async ({ text, finishReason }) => {
                if (finishReason === 'stop') {
                    try {
                        const conversationContext = messages
                            .slice(-3)
                            .map(
                                (m) =>
                                    `${m.role}: ${m.parts
                                        .map((p) => (p.type === 'text' ? p.text : ''))
                                        .join('')}`
                            )
                            .join('\n');

                        const optionsResult = await generateObject({
                            model: openai(MODEL),
                            schema: optionsSchema,
                            prompt: `Basé sur cette conversation récente:
                                ${conversationContext}
                                
                                Et cette réponse que je viens de donner:
                                "${text}"
                                
                                Génère 3-4 options pertinentes que l'utilisateur pourrait choisir pour orienter son choix.
                                Les options doivent être:
                                - Spécifiques et actionnables
                                - Logiquement liées au contexte
                                
                                Exemples de bonnes options:
                                - "Préfères-tu une bière fruitée ou amère ?"
                                - "Préfères-tu une bière légère ou forte ?"`,
                        });

                        // Stocker les options (vous pouvez les retourner dans le stream ou les stocker)
                        console.log('Options générées:', optionsResult.object.options);
                    } catch (error) {
                        console.error('Erreur génération options:', error);
                    }
                }
            },
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error('Erreur API chat:', error);
        return new Response('Erreur interne du serveur', { status: 500 });
    }
}
*/
