import React, { useState } from 'react';
import { BookOpen, Clock, Tag, ArrowRight, ArrowLeft, Share2, Bookmark } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  image: string;
  content: string[];
  author: string;
  date: string;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "The Ocean Plastic Crisis: How You Can Help",
    summary: "Every year, millions of tons of plastic enter our oceans. Learn about the simple steps you can take to reduce your plastic footprint today.",
    category: "Ocean Conservation",
    readTime: "5 min read",
    author: "Sarah Jenkins",
    date: "Nov 15, 2023",
    image: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&q=80&w=1000",
    content: [
      "Plastic pollution has become one of the most pressing environmental issues, as rapidly increasing production of disposable plastic products overwhelms the world’s ability to deal with them. Plastic pollution is most visible in developing Asian and African nations, where garbage collection systems are often inefficient or nonexistent.",
      "Most of the plastic trash in the oceans, Earth’s last sink, flows from land. Trash is also carried to sea by major rivers, which act as conveyor belts, picking up more and more trash as they move downstream. Once at sea, much of the plastic trash remains in coastal waters. But once caught up in ocean currents, it can be transported around the world.",
      "Here are a few ways you can help:",
      "1. Reduce Your Use of Single-Use Plastics: Wherever you live, the easiest and most direct way that you can get started is by reducing your own use of single-use plastics. Single-use plastics include plastic bags, water bottles, straws, cups, utensils, dry cleaning bags, take-out containers, and more.",
      "2. Recycle Properly: This should go without saying, but when you use single-use (and other) plastics that can be recycled, always be sure to recycle them. At present, just 9% of plastic is recycled worldwide. Recycling helps keep plastics out of the ocean and reduces the amount of 'new' plastic in circulation.",
      "3. Participate In (or Organize) a Beach or River Cleanup: Help remove plastics from the ocean and prevent them from getting there in the first place by participating in, or organizing a cleanup of your local beach or waterway."
    ]
  },
  {
    id: 2,
    title: "Understanding Recycling Symbols",
    summary: "Confused by the numbers on your plastic containers? We break down what each recycling symbol means and how to sort them correctly.",
    category: "Education",
    readTime: "8 min read",
    author: "Dr. Mark R.",
    date: "Nov 10, 2023",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000",
    content: [
      "You've probably seen the triangle with a number inside it on the bottom of your plastic containers. This is the Resin Identification Code, and while it identifies the type of plastic, it doesn't always mean the item is recyclable in your curbside bin.",
      "Let's break them down:",
      "#1: PET (Polyethylene Terephthalate). Found in: Soft drink bottles, water bottles, peanut butter jars. Status: Widely recycled. Rinse them out and toss them in the bin.",
      "#2: HDPE (High-Density Polyethylene). Found in: Milk jugs, cleaning agent containers, shampoo bottles. Status: Widely recycled. These are some of the easiest plastics to recycle.",
      "#3: PVC (Polyvinyl Chloride). Found in: Piping, medical equipment, some food packaging. Status: Rarely recycled curbside. PVC releases toxins when broken down, so it requires special handling.",
      "#4: LDPE (Low-Density Polyethylene). Found in: Squeezable bottles, shopping bags, clothing, furniture. Status: Sometimes recycled. Plastic bags usually jam sorting machines and should be returned to grocery store drop-off points.",
      "#5: PP (Polypropylene). Found in: Yogurt containers, straws, medicine bottles. Status: Increasingly accepted. Check your local guidelines.",
      "#6: PS (Polystyrene). Found in: Disposable plates and cups, meat trays, egg cartons. Status: Difficult to recycle. Most curbside programs do not accept Styrofoam."
    ]
  },
  {
    id: 3,
    title: "Composting 101: Turning Waste into Gold",
    summary: "Start your own compost bin at home! It's easier than you think and significantly reduces the amount of waste sent to landfills.",
    category: "Lifestyle",
    readTime: "6 min read",
    author: "Emma Green",
    date: "Oct 28, 2023",
    image: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?auto=format&fit=crop&q=80&w=1000",
    content: [
      "Composting is a natural process of recycling organic matter, such as leaves and food scraps, into a valuable fertilizer that can enrich soil and plants. Anything that grows decomposes eventually; composting simply speeds up the process by providing an ideal environment for bacteria, fungi, and other decomposing organisms to do their work.",
      "Why Compost?",
      "- Reduces Landfill Waste: Food scraps and yard waste make up more than 28 percent of what we throw away.",
      "- Reduces Methane Emissions: Landfills are a major source of methane, a greenhouse gas.",
      "- Improves Soil Health: Compost enriches soil, helping retain moisture and suppress plant diseases.",
      "What to Compost (Greens & Browns):",
      "- Greens (Nitrogen): Vegetable and fruit scraps, coffee grounds, grass clippings.",
      "- Browns (Carbon): Dead leaves, branches, twigs, paper.",
      "What NOT to Compost: Dairy products, meat, fats, grease, pet waste."
    ]
  },
  {
    id: 4,
    title: "The Hidden Cost of Fast Fashion",
    summary: "The fashion industry is one of the largest polluters in the world. Discover sustainable alternatives and how to build an eco-friendly wardrobe.",
    category: "Lifestyle",
    readTime: "7 min read",
    author: "Alex Rivera",
    date: "Oct 15, 2023",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000",
    content: [
      "Fast fashion refers to cheap, trendy clothing that samples ideas from the catwalk or celebrity culture and turns them into garments in high street stores at breakneck speed. The idea is to get the newest styles on the market as fast as possible, so shoppers can snap them up while they are still at the height of their popularity.",
      "However, this speed comes at a cost. The fashion industry produces 10% of all humanity's carbon emissions, is the second-largest consumer of the world's water supply, and pollutes the oceans with microplastics. Furthermore, 85% of all textiles go to the dump each year.",
      "What can you do?",
      "1. Buy Less, Choose Well: Invest in high-quality pieces that will last longer.",
      "2. Shop Second Hand: Thrift stores and online resale platforms extend the life of garments.",
      "3. Support Sustainable Brands: Look for brands that use organic materials and fair labor practices.",
      "4. Repair and Upcycle: Learn basic sewing skills to fix buttons or hem pants instead of throwing them away."
    ]
  },
  {
    id: 5,
    title: "Energy Efficiency at Home",
    summary: "Simple changes in your home can lead to massive energy savings. Save money on your bills while helping the planet.",
    category: "Technology",
    readTime: "4 min read",
    author: "David Chen",
    date: "Oct 02, 2023",
    image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&q=80&w=1000",
    content: [
      "Making your home more energy-efficient doesn't mean you have to install expensive solar panels (though that helps!). Here are some low-cost ways to reduce your energy consumption:",
      "1. Switch to LEDs: LED bulbs use at least 75% less energy, and last 25 times longer, than incandescent lighting.",
      "2. Unplug Electronics: Many devices consume energy even when turned off. Use smart power strips to cut the power completely.",
      "3. Seal Air Leaks: Drafty windows and doors can increase your heating and cooling bills significantly. Use weatherstripping to seal gaps.",
      "4. Wash Clothes in Cold Water: Heating water accounts for about 90% of the energy needed to run a washer.",
      "5. Use a Programmable Thermostat: Adjust the temperature automatically when you are asleep or away from home."
    ]
  },
  {
    id: 6,
    title: "Sustainable Eating: A Guide",
    summary: "Your diet has a profound impact on the environment. Learn how plant-based choices and local sourcing can reduce your carbon footprint.",
    category: "Food",
    readTime: "6 min read",
    author: "Maria Garcia",
    date: "Sep 20, 2023",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000",
    content: [
      "What we eat is responsible for a quarter of global greenhouse gas emissions. But making small changes to your diet can have a big impact.",
      "1. Eat More Plants: Animal agriculture is a major contributor to deforestation and methane emissions. Try 'Meatless Mondays' or incorporate more plant-based meals into your week.",
      "2. Eat Local and Seasonal: Transporting food around the world requires a lot of fuel. Buying from local farmers markets reduces 'food miles'.",
      "3. Reduce Food Waste: About one-third of all food produced is lost or wasted. Plan your meals, use leftovers, and compost what you can't eat.",
      "4. Choose Sustainable Seafood: If you eat fish, check guides like Seafood Watch to ensure you aren't supporting overfishing."
    ]
  }
];

export const Articles: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-releaf-600 dark:text-slate-400 dark:hover:text-releaf-400 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Articles
        </button>

        <div className="bg-white dark:bg-[#1F2937] rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700 animate-[float_0.3s_ease-out]">
          <div className="h-64 sm:h-96 relative">
             <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
             <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="bg-releaf-500 px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">{selectedArticle.category}</span>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{selectedArticle.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-200">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">{selectedArticle.author[0]}</div>
                      {selectedArticle.author}
                   </div>
                   <span>{selectedArticle.date}</span>
                   <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {selectedArticle.readTime}
                   </div>
                </div>
             </div>
          </div>
          
          <div className="p-8 sm:p-12">
             <div className="prose dark:prose-invert max-w-none">
                {selectedArticle.content.map((paragraph, idx) => (
                   <p key={idx} className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">{paragraph}</p>
                ))}
             </div>

             <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <p className="text-slate-500 dark:text-slate-400 italic">Did you find this helpful?</p>
                <div className="flex gap-2">
                   <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-releaf-100 dark:hover:bg-releaf-900/30 text-slate-600 dark:text-slate-400 hover:text-releaf-600 transition-colors">
                      <Share2 size={20} />
                   </button>
                   <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-releaf-100 dark:hover:bg-releaf-900/30 text-slate-600 dark:text-slate-400 hover:text-releaf-600 transition-colors">
                      <Bookmark size={20} />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Eco Education Hub</h2>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Discover the latest insights, tips, and stories about sustainability and how you can make a real difference.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ARTICLES.map((article) => (
          <div 
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white dark:bg-[#1F2937] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group cursor-pointer hover:-translate-y-1"
          >
            <div className="h-48 overflow-hidden relative">
               <img 
                 src={article.image} 
                 alt={article.title} 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
               />
               <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <Tag size={12} />
                  {article.category}
               </div>
            </div>
            <div className="p-6">
               <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                  <Clock size={14} />
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span>{article.date}</span>
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-releaf-500 transition-colors">
                 {article.title}
               </h3>
               <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                 {article.summary}
               </p>
               <div className="flex items-center text-releaf-600 dark:text-releaf-400 font-semibold text-sm">
                  Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};