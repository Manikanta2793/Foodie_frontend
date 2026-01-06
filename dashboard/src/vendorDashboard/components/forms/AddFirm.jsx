import React, { useState } from 'react'
import './AddFirm.css'
import{API_URL} from '../../data/apiPath'

const AddFirm = () => {
    const [firmName, setFirmName] = useState('');
    const [area, setArea] = useState('');
    const [category, setCategory] = useState([]);
    const [region, setRegion] = useState([])
    const [offer, setOffer] = useState('');
    const [file, setFile] = useState(null);

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (category.includes(value)) {
            setCategory(category.filter((item) => item !== value))
        } else {
            setCategory([...category, value])
        }

    }
    const handleRegionChange = (event) => {
        const value = event.target.value;
        if (region.includes(value)) {
            setRegion(region.filter((item) => item !== value))
        } else {
            setRegion([...region, value])
        }

    }
    const handleImageUpload = (event)=>{
        const selectedImage = event.target.files[0];
        setFile(selectedImage)
    }

    const handleFirmSubmit = async (event) => {
        event.preventDefault();

        try {
            const loginToken = localStorage.getItem('loginToken');
            if (!loginToken) {
                console.error('User not Authenticated');
                return;
            }
            const formData = new FormData();
            formData.append('firmName', firmName);
            formData.append('area', area);
            formData.append('offer', offer);
            formData.append('image', file);

            category.forEach((value) => {
                formData.append('category', value)
            })
            region.forEach((value) => {
                formData.append('region', value)
            })


            const response = await fetch(`${API_URL}/firm/add-firm`,{
                method:'POST',
                headers:{
                    'token':`${loginToken}`

                },
                body:formData
            })
            const data = await response.json();
            if(response.ok){
                console.log(data);
                alert('firm added successfully');
                setFirmName('');
                setArea('');
                setCategory([]);
                setRegion([]);
                setOffer('');
                setFile(null);
            } else if(data.message =='vendor should have only i firm') {
                alert('Firm Exists .Only one firm can add');
            }else{
                alert('Failed to add firm')
            }
            const firmId = data.firmId

            localStorage.setItem('firmId',firmId);

        } catch (error) {
            console.error('failed to add firm', error);
            alert('An error occurred');
        }

    }


    return (
        <div className="firmSection">
            <form className="tableForm" onSubmit={handleFirmSubmit}>
                <h3>Add Firm</h3>

                <label>Firm Name</label>
                <input type='text' name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)} />
                <label>Area</label>
                <input type='text' name='area' value={area} onChange={(e) => setArea(e.target.value)} />
                {/* <label>Category</label>
                    <input type='text' /> */}
                <div className='check-inp'>
                    <label>Category</label>
                    <div className="inputContainer">
                        <div className='checkboxContainer'>
                            <label>Veg</label>
                            <input type="checkbox" checked={category.includes('veg')} value='veg' onChange={handleCategoryChange} />

                        </div>
                        <div className='checkboxContainer'>
                            <label>Non-Veg</label>
                            <input type="checkbox" checked={category.includes('non-veg')} value='non-veg' onChange={handleCategoryChange} />

                        </div>
                    </div>

                </div>
                <div className='check-inp'>
                    <label>Region</label>
                    <div className="inputContainer">
                        <div className='regionboxContainer'>
                            <label>South-Indian</label>
                            <input type="checkbox" checked={region.includes('south-indian')} value='south-indian' onChange={handleRegionChange} />

                        </div>
                        <div className='regionboxContainer'>
                            <label>North-Indian</label>
                            <input type="checkbox" checked={region.includes('north-indian')} value='north-indian' onChange={handleRegionChange} />

                        </div>
                        <div className='regionboxContainer'>
                            <label>Chinese</label>
                            <input type="checkbox" checked={region.includes('chinese')} value='chinese' onChange={handleRegionChange} />

                        </div>
                        <div className='regionboxContainer'>
                            <label>Bakery</label>
                            <input type="checkbox" checked={region.includes('bakery')} value='bakery' onChange={handleRegionChange} />

                        </div>
                    </div>

                </div>
                {/* <label>Region</label>
                    <input type='text' /> */}
                <label>Offer</label>
                <input type='text' name='offer' value={offer} onChange={(e) => setOffer(e.target.value)} />
                <label>Firm Image</label>
                <input type='file' onChange={handleImageUpload} />


                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddFirm