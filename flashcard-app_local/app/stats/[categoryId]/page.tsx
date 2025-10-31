import { createAdminClient } from "@/lib/supabase/server";

export default async function StatsPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const catId = Number(categoryId);
  if (isNaN(catId)) return <div>Invalid category ID</div>;

  const supabase = await createAdminClient();

  // 1️⃣ Fetch all stats for this category
  const { data: rawStats } = await supabase
    .from("stats")
    .select("card_id, correct, incorrect")
    .eq("category_id", catId);

  if (!rawStats || rawStats.length === 0) {
    return <p>No attempts yet for this category.</p>;
  }

  // 2️⃣ Fetch all cards referenced by the stats
  const cardIds = rawStats.map((s) => s.card_id);
  const { data: cards } = await supabase
    .from("cards")
    .select("id, question")
    .in("id", cardIds);

  // 3️⃣ Merge stats with questions
  const statsMap: Record<
    number,
    { cardId: number; correct: number; incorrect: number; question: string }
  > = {};

  rawStats.forEach((s) => {
    const card = cards?.find((c) => c.id === s.card_id);
    const question = card?.question ?? "Unknown question";

    if (!statsMap[s.card_id!]) {
      statsMap[s.card_id!] = {
        cardId: s.card_id!,
        correct: 0,
        incorrect: 0,
        question,
      };
    }
    statsMap[s.card_id!].correct += s.correct || 0;
    statsMap[s.card_id!].incorrect += s.incorrect || 0;
  });

  const stats = Object.values(statsMap);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Category Stats</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Question</th>
            <th className="border px-2 py-1">Correct</th>
            <th className="border px-2 py-1">Incorrect</th>
            <th className="border px-2 py-1">Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.cardId}>
              <td className="border px-2 py-1">{s.question}</td>
              <td className="border px-2 py-1">{s.correct}</td>
              <td className="border px-2 py-1">{s.incorrect}</td>
              <td className="border px-2 py-1">
                {s.correct + s.incorrect > 0
                  ? Math.round((s.correct / (s.correct + s.incorrect)) * 100) +
                    "%"
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
