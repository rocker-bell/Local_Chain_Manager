import "../Styles/MainPage.css";
import TransactionSearch from "./TransactionSearch.jsx";
import SearchResults from "./SearchResults.jsx";
const MainPage = () => {
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

          
            
            <div className={`search_results ${activeResults ? 'Active' : ''}`}>
                <SearchResults Filters={filters} />
            </div>
        </div>

        </>
    )
}

export default MainPage;