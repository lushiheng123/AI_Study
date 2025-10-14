import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold text-primary-600">
                        Postly
                    </Link>
                    <div className="space-x-4">
                        <Link to="/" className="text-gray-600 hover:text-primary-600">
                            首页
                        </Link>
                        <Link to="/about" className="text-gray-600 hover:text-primary-600">
                            关于
                        </Link>
                        <Link to="/faq" className="text-gray-600 hover:text-primary-600">
                            FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}