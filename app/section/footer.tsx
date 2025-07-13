import Link from "next/link";
export default function Footer(){
    return(
        <footer className="bg-gray-800 text-gray-400">
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                <div className="col-span-2 md:col-span-1">
                    <Link href="#" className="flex items-center space-x-2">
                        <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>
                        <span className="font-bold text-xl text-white">Review Analysis Tool</span>
                    </Link>
                    <p className="mt-4 text-sm">Making data analysis simple and accessible for everyone.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Product</h4>
                    <ul className="space-y-2">
                        <li><Link href="/" className="hover:text-white">Features</Link></li>
                        <li><Link href="/" className="hover:text-white">Pricing</Link></li>
                        <li><Link href="/" className="hover:text-white">API</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Support</h4>
                    <ul className="space-y-2">
                        <li><Link href="/" className="hover:text-white">Help Center</Link></li>
                        <li><Link href="/" className="hover:text-white">Documentation</Link></li>
                        <li><Link href="/" className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Company</h4>
                    <ul className="space-y-2">
                        <li><Link href="/" className="hover:text-white">About</Link></li>
                        <li><Link href="/" className="hover:text-white">Blog</Link></li>
                        <li><Link href="/" className="hover:text-white">Privacy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
                <p>&copy; 2025 Review Analysis Tool. All rights reserved.</p>
            </div>
        </div>
    </footer>
    );
}