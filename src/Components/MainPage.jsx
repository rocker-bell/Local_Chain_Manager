import "../Styles/MainPage.css";
import TransactionSearch from "./TransactionSearch.jsx";
import SearchResults from "./SearchResults.jsx";
import SendTransaction from "./BlockchainTransaction.jsx";
import { useState } from "react";
const MainPage = () => {
    const [filters, setFilters] = useState();
    const [activeResults, setActiveResults] = useState();
    return (
        <>
            <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-section1">
                    <h1>Blockchain Transaction Manager Simulation</h1>
                    <p>Send and manage your transactions</p>
                </div>

                <section className="history-section">
                
                    <TransactionSearch 
                        onResults={(data) => {
                            setFilters(data);
                            setActiveResults(true);
                        }}
                    />
                </section>
            </header>


             <main className="dashboard-grid">
                <section className="card-wrapper">
                    <SendTransaction />
                </section>

                <section className="card-wrapper guide-card">
                    <div className="card-header">
                        <h2>Quick Guide</h2>
                        <p>How to use this application</p>
                    </div>
                    <ul className="guide-list">
                        <li><span>1</span> Connect your MetaMask wallet</li>
                        <li><span>2</span> Send transaction</li>
                        <li><span>3</span> Use search</li>
                    </ul>
                </section>
            </main>

          
            
            <div className={`search_results ${activeResults ? 'Active' : ''}`}>
                <SearchResults Filters={filters} />
            </div>
        </div>

        </>
    )
}

export default MainPage;