"use client";

import CreateCard from "./CreateCard";
import DeleteCard from "./DeleteCard";
import UpdateCard from "./UpdateCard";

type Card = {
  id: number;
    question: string;
    answer: string;
};

type CardListProps = {
  cards: Card[];
  categoryId: number
};

export default function CardsList({ cards, categoryId }: CardListProps) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cards</h1>

      <CreateCard categoryId={categoryId} />

      <div className="space-y-4 mt-6">
        {cards && cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card.id}
              className="flex justify-between items-center bg-white rounded-lg shadow p-4"
            >
              <span className="text-gray-800">{card.question}</span>
              <span className="text-gray-800">{card.answer}</span>
              <DeleteCard cardId={card.id} />
              <UpdateCard
                cardId={card.id}
                currentQuestion={card.question}
                currentAnswer={card.answer}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No cards yet.</p>
        )}
      </div>
    </div>
  );
}
