import Card from "./Card";

export default function CardList({ listings }) {
  return (
    <div className="lg:h-[65vh] overflow-y-scroll lg:scrollbar-thin">
      {listings?.map((house) => (
        <Card key={house.id} house={house} />
      ))}
    </div>
  );
}
