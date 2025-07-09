// ForkLandingPage.tsx
import { Button } from "@/components/ui/button";
import { Sparkles, Salad, Smile, Leaf, Clock } from "lucide-react";

export default function ForkLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 text-gray-800">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          Healthy Meals, Made Simple.
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          We aim to make the most <span className="text-green-600 font-semibold">nutritious</span>, 
          <span className="text-green-600 font-semibold"> low-calorie</span>, <span className="text-green-600 font-semibold">scientific</span>, 
          <span className="text-green-600 font-semibold"> happy</span>, and <span className="text-green-600 font-semibold">convenient</span> way of 
          meal planning accessible to everyone.
        </p>
        <Button className="px-6 py-3 text-lg bg-green-600 hover:bg-green-700 rounded-full shadow">
          Start Planning Now
        </Button>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          <Feature icon={<Salad className="text-green-500 w-8 h-8" />} title="Nutritious">
            Scientifically crafted meals rich in essential nutrients.
          </Feature>
          <Feature icon={<Leaf className="text-green-500 w-8 h-8" />} title="Low-Calorie">
            Maximize health while minimizing unnecessary calories.
          </Feature>
          <Feature icon={<Sparkles className="text-green-500 w-8 h-8" />} title="Scientific">
            Backed by nutrition science and research.
          </Feature>
          <Feature icon={<Smile className="text-green-500 w-8 h-8" />} title="Happy">
            Meals that make your body and mind feel good.
          </Feature>
          <Feature icon={<Clock className="text-green-500 w-8 h-8" />} title="Convenient">
            Plan, shop, and prep without the hassle.
          </Feature>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-10">
        © {new Date().getFullYear()} Fork — All rights reserved.
      </footer>
    </div>
  );
}

function Feature({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-green-50 rounded-2xl shadow p-6 text-center hover:shadow-md transition">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{children}</p>
    </div>
  );
}
