import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import london from "../assets/london.png";
import Header from "@/components/Header";

function Home() {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <Header />
      <Hero />

      {/* DESTINOS POPULARES */}
      <section className="px-32 mt-36">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Destinos mais procurados</h2>

            <p className="text-gray-500 mt-2">
              Descubra alguns dos destinos favoritos dos nossos viajantes.
            </p>
          </div>

          <Button variant="outline">Ver todos</Button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card
              key={index}
              className="py-5 hover:shadow-lg transition cursor-pointer"
            >
              <img src={london} className="aspect-video w-full object-cover" />
              <CardHeader>
                <CardAction>
                  <p>aaa</p>
                </CardAction>
                <h1>Design systems meetup</h1>
                <h2>
                  A practical talk on component APIs, accessibility, and
                  shipping faster.
                </h2>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">View Event</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* OUTRA SECTION */}
      <section className="px-32 py-24">
        <h2 className="text-3xl font-bold mb-8">Inspire sua próxima viagem</h2>

        <div className="h-80 rounded-xl bg-gray-200"></div>
      </section>
    </div>
  );
}

export default Home;
