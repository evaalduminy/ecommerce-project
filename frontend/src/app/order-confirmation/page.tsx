import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-24 px-6 md:px-12 flex justify-center items-center w-full min-h-screen bg-[#0f0f0f]">
        <div className="w-full max-w-2xl bg-[#1a1a1a] p-8 md:p-12 rounded-xl border border-[#333] flex flex-col items-center">
            
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d80000]/10 rounded-full mb-6">
                <span className="text-4xl text-[#d80000]">&check;</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-2 text-center uppercase">Order Confirmed</h1>
            <p className="text-[#aaaaaa] text-center max-w-md mb-12">
                Thank you for your purchase. We have received your order and will begin processing it shortly.
            </p>

            <div className="w-full bg-[#0f0f0f] border border-[#333] rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center border-b border-[#333] pb-4 mb-4">
                    <span className="text-[#aaaaaa] uppercase text-sm font-bold tracking-widest">Order #</span>
                    <span className="text-white font-bold">#CG-8492-AX</span>
                </div>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Metropolis Shadows Print</span>
                        <span className="text-white">$1,250.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Neon Rain Photobook</span>
                        <span className="text-white">$850.00</span>
                    </div>
                </div>
                
                <div className="flex justify-between items-center border-t border-[#333] mt-4 pt-4">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-[#d80000] font-bold text-xl">$2,100.00</span>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-[#0f0f0f] border border-[#333] p-6 rounded-lg">
                    <h3 className="text-white font-bold uppercase tracking-wider mb-2 text-sm">Shipping To</h3>
                    <p className="text-[#aaaaaa] text-sm leading-relaxed">
                        Elias Thorne<br />
                        1428 Elm Street, Apt 4B<br />
                        New York, NY 10011<br />
                        United States
                    </p>
                </div>
                <div className="bg-[#0f0f0f] border border-[#333] p-6 rounded-lg">
                    <h3 className="text-white font-bold uppercase tracking-wider mb-2 text-sm">Updates</h3>
                    <p className="text-[#aaaaaa] text-sm leading-relaxed">
                        A confirmation has been sent to elias.t@example.com. We will notify you when your items have shipped.
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link href="/products" className="w-full">
                    <button className="w-full bg-[#d80000] text-white font-bold uppercase tracking-wider py-4 rounded hover:bg-[#b30000] transition-colors">
                        Continue Shopping
                    </button>
                </Link>
            </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
