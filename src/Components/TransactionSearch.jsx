import "../Styles/TransactionSearch.css"
import {useState, useEffect} from "react";
import { fetchTransactions } from "../api/blockchain.api";
export default function TransactionSearch ({onResults}) {
     const [QuerryActive, setQerryActive] = useState(false);
    const [Loading, setLoading] = useState(false);

    const [FormData, setFromData] = useState({
        fromAddress: "",
        toAddress: "",
        minAmount: "",
        maxAmount: "",
        startDate: "",
        endDate: "",
        status: ""
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFromData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log('formdata', FormData);

            const results = await fetchTransactions(FormData);

           
            if (onResults) {
                onResults(results);
            }

            setQerryActive(false);

        } catch (err) {
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }

        // Reset form
        setFromData({
            fromAddress: "",
            toAddress: "",
            minAmount: "",
            maxAmount: "",
            startDate: "",
            endDate: "",
            status: ""
        });
    };

    const HandleActiveQuerry = () => {
        setQerryActive(true);
        console.log('clicked');
    };

    const HandleCancelQuerry = () => {
        setQerryActive(false);
    };

    return (
        <>
            <div className="TransactionSearch-wrapper">
                <div className="InitSearch_element">
                    <button 
                        type="button" 
                        className='search-icon' 
                        onClick={HandleActiveQuerry}
                    >
                        <img 
                            width="35" 
                            height="35" 
                            src="https://img.icons8.com/liquid-glass/48/search.png" 
                            alt="search" 
                            // className='search-icon'
                        />
                    </button>
                </div>

                <div className={`form_wrapper ${QuerryActive ? "Active" : ""}`}>
                    <form className='Searchform_element' onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label className='form_label'>formAddress</label>
                            <input
                                name="fromAddress"
                                type="text"
                                className='form_control'
                                placeholder='formAddress'
                                value={FormData.fromAddress}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label className='form_label'>toAddress</label>
                            <input
                                name="toAddress"
                                type="text"
                                placeholder='toAddress'
                                className='form_control'
                                value={FormData.toAddress}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label className='form_label'>minAmmount</label>
                            <input
                                name="minAmount"
                                type="text"
                                placeholder='minAmount'
                                className='form_control'
                                value={FormData.minAmount}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label className='form_label'>maxAmount</label>
                            <input
                                name="maxAmount"
                                type="text"
                                className='form_control'
                                placeholder='maxAmount'
                                value={FormData.maxAmount}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label className='form_label'>StartDate</label>
                            <input
                                name="startDate"
                                type="text"
                                className='form_control'
                                placeholder='StartDate'
                                value={FormData.startDate}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label className='form_label'>EndDate</label>
                            <input
                                name="endDate"
                                type="text"
                                className='form_control'
                                placeholder='EndDate'
                                value={FormData.endDate}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className='form_label'>status</label>
                            <select
                                name="status"
                                className="form_control"
                                value={FormData.status}
                                onChange={onChange}
                            >
                              <option value="">Select status</option>
                                    <option value="pending">Pending</option>
                                    <option value="success">Confirmed</option>  
                                    <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className='TransactionSearch_btnGroupe'>
                            <button
                                type="submit"
                                className="btn"
                                disabled={Loading}
                            >
                                {Loading ? "Loading..." : "Search"}
                            </button>

                            <button
                                type='button'
                                className='btn'
                                onClick={HandleCancelQuerry}
                            >
                                cancel
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}