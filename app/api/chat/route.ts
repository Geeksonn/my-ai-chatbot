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
    const { data: edition, error: edErr } = await supabase
        .from('editions')
        .select('id')
        .eq('active', true)
        .single();

    if (edErr || !edition) {
        console.error('Error fetching active edition:', edErr);
        return [];
    }

    const { data: beers, error } = await supabase
        .from('beers')
        .select(`name, degree_integer, degree_decimal, ibu, type`)
        .eq('edition', edition.id)
        .eq('displayonstats', true);

    if (error) {
        console.error('Error fetching beers:', error);
        return [];
    }

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
