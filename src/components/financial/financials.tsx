import { useEffect, useState } from 'react';
import { initialize, document } from '@ironcorelabs/ironweb';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import Button from '~/core/ui/Button';
import LogoImage from '~/core/ui/Logo/LogoImage';

export default function Financials() {
  const [isSdkInitialized, setSdkInitialized] = useState(false);
  const [newData, setNewData] = useState<{ id: string, url: string, image: string, subCategory: string | null, category: string }[]>([]);
          const [currentCategory, setCurrentCategory] = useState<string | null>(null); // <-- Add this line here
          const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
          const [currentSubCategory, setCurrentSubCategory] = useState<string | null>(null);
  useEffect(() => {
    initialize(
      () => fetch('https://us-central1-test7-8a527.cloudfunctions.net/generateJwt')
        .then(response => response.text()),
      () => Promise.resolve('testpassword'),
    )
    .then(() => setSdkInitialized(true))
    .catch((error: Error) => console.error('Error initializing IronWeb SDK:', error));
  }, []);

  useEffect(() => {
    const fetchAndDecryptData = async () => {
      if (!isSdkInitialized || !currentCategory) return;
  
      const auth = getAuth();
      const user = auth.currentUser;
      let userName = null;
  
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
  
        if (userDoc.exists()) {
          const userData = userDoc.data() as { userName: string };
          userName = userData.userName;
        }
      }
  
      if (!userName) {
        console.error('No user is currently logged in or userName is not set');
        return;
      }
  
      const requestBody = {
        userName: userName,
        categories: currentSubCategory,
      };
      const response = await fetch(`/api/decrypt/decrypt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const groups = await response.json();
  
      for (const group of groups) {
        if (group.url && group.image) {
          const encryptedDataBytes = new Uint8Array(atob(group.url).split("").map((c) => c.charCodeAt(0)));
          const encryptedImageBytes = new Uint8Array(atob(group.image).split("").map((c) => c.charCodeAt(0)));
          let documentId, imageId;
  
          try {
            documentId = await document.getDocumentIDFromBytes(encryptedDataBytes);
            imageId = await document.getDocumentIDFromBytes(encryptedImageBytes);
          } catch (error) {
            console.error(`Error getting document ID for group ${group.id}:`, error);
            continue;
          }
  
          if (documentId && imageId) {
            const decryptedData = await document.decrypt(documentId, encryptedDataBytes);
            const decryptedImage = await document.decrypt(imageId, encryptedImageBytes);
            const decryptedText = new TextDecoder().decode(new Uint8Array(decryptedData.data));
            const decryptedImageText = new TextDecoder().decode(new Uint8Array(decryptedImage.data));
    
            // Check if the document for the current subcategory is already in the newData state
            if (!newData.some(data => data.subCategory === currentSubCategory)) {
              setNewData(prevData => [...prevData, { id: group.id, url: decryptedText, image: decryptedImageText, category: currentCategory, subCategory: currentSubCategory }]);
            }
          } else {
            console.error(`Document ID is null for group ${group.id}`);
          }
        } else {
          console.error(`URL or image is missing for group ${group.id}`);
        }
      }
    };
    fetchAndDecryptData();
  }, [isSdkInitialized, currentSubCategory, currentCategory, newData]);
  const mainCategories = [
    'Financials Q3-2017',
    'Financials Q4-2017',
    'Financials Q1-2018',
    'Financials Q2-2018',
    'Financials Q3-2018',
    'Financials Q4-2018',
    'Financials Q1-2019',
    'Financials Q2-2019',
    'Financials Q3-2019',
    'Financials Q4-2019',
    'Financials Q1-2020',
    'Financials Q2-2020',
    'Financials Q3-2020',
    'Financials Q4-2020',
    'Financials Q1-2021',
    'Financials Q2-2021',
    'Financials Q3-2021',
    'Financials Q4-2021',
    'Financials Q1-2022',
    'Financials Q2-2022',
    'Financials Q3-2022',
    'Financials Q1-2023',
    'Financials Q2-2023',
    'Financials Q3-2023',
    'Financials 2023-Q3',
    'Financials Q4-2023',
    'Financials Q1-2024',
    'Financials Q2-2024',
    'Quarterly Report Q4-2023',
    'Quarterly Report Q1-2024',
    'Quarterly Report Q2-2024',
    'Quarterly Report Q3-2024',
    'Quarterly Report Q4-2024',
    'Financials-Q32024',
    'Financials-Q42024',
    'Financials-Q12025',


  ];

  
  

const subCategories = {
  'Financials Q3-2017': 'Financials Q3-2017',
  'Financials Q4-2017': 'Financials Q4-2017',
  'Financials Q1-2018': 'Financials Q1-2018',
  'Financials Q2-2018': 'Financials Q2-2018',
  'Financials Q3-2018': 'Financials Q3-2018',
  'Financials Q4-2018': 'Financials Q4-2018',
  'Financials Q1-2019': 'Financials Q1-2019',
  'Financials Q2-2019': 'Financials Q2-2019',
  'Financials Q3-2019': 'Financials Q3-2019',
  'Financials Q4-2019': 'Financials Q4-2019',
  'Financials Q1-2020': 'Financials Q1-2020',
  'Financials Q2-2020': 'Financials Q2-2020',
  'Financials Q3-2020': 'Financials Q3-2020',
  'Financials Q4-2020': 'Financials Q4-2020',
  'Financials Q1-2021': 'Financials Q1-2021',
  'Financials Q2-2021': 'Financials Q2-2021',
  'Financials Q3-2021': 'Financials Q3-2021',
  'Financials Q4-2021': 'Financials Q4-2021',
  'Financials Q1-2022': 'Financials Q1-2022',
  'Financials Q2-2022': 'Financials Q2-2022',
  'Financials Q3-2022': 'Financials Q3-2022',
  'Financials Q1-2023': 'Financials Q1-2023',
  'Financials Q2-2023': 'Financials Q2-2023',
  'Financials Q3-2023': 'Financials Q3-2023',
  'Financials 2023-Q3': 'Financials 2023-Q3',
  'Financials Q4-2023': 'Financials-Q42023',
  'Financials Q1-2024': 'Financials-Q12024',
  'Financials Q2-2024': 'Financials-Q22024',

  'Quarterly Report Q4-2023': 'Quarterly Report Q4-2023',
  'Quarterly Report Q1-2024': 'Quarterly Report Q1-2024',
  'Quarterly Report Q2-2024': 'Quarterly Report Q2-2024',
  'Quarterly Report Q3-2024': 'Quarterly Report Q3-2024',
  'Quarterly Report Q4-2024': 'Quarterly Report Q4-2024',

  'Financials-Q32024': 'Financials-Q32024',
  'Financials-Q42024': 'Financials-Q42024',
  'Financials-Q12025': 'Financials-Q12025',



  
};

  const buttonStyle = {
    backgroundColor: '#0000FF', /* Dark Blue */
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center' as 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '12px', // This will make the edges rounded
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', // This will add a shadow
  };
  const boxStyle = {
    marginTop: '20px', 
    marginBottom: '20px', 
    border: '1px solid #0000FF', 
    padding: '10px',
    borderRadius: '15px', // This will make the border rounded
    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', // This will give it a 3D effect
  };
  return (
    <div>
           <div style={{ display: 'flex', justifyContent: 'center' }}>
  <LogoImage style={{ width: '150px', height: '100px', paddingBottom: '20px' }} />
</div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      {mainCategories.map((category, index) => (
  <button 
    key={index} // Added key prop here
    style={buttonStyle} 
    onClick={() => {
      setCurrentCategory(category);
      const subCategory = subCategories[category as keyof typeof subCategories];
      setCurrentSubCategory(subCategory);
    }}
  >
    {category}
  </button>
))}
      </div>
  
      {currentCategory && (
  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
    <label style={buttonStyle}>
      <input
        type="checkbox"
        checked={selectedSubCategories.includes(subCategories[currentCategory as keyof typeof subCategories])}
        onChange={() => {
          const subCategory = subCategories[currentCategory as keyof typeof subCategories];
          console.log('Subcategory clicked:', subCategory);
          if (selectedSubCategories.includes(subCategory)) {
            setSelectedSubCategories(selectedSubCategories.filter(sc => sc !== subCategory));
          } else {
            setSelectedSubCategories([...selectedSubCategories, subCategory]);
          }
        }}
      />
      {subCategories[currentCategory as keyof typeof subCategories]}
    </label>
  </div>
)}
 {selectedSubCategories.length > 0 && (
  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: '20px', padding: '10px' }}>
    <h2 style={{ marginRight: '10px' }}>Selected Subcategories:</h2>
    {selectedSubCategories.map(subCategory => (
      <label     key={subCategory} // Added key prop here

      style={{ ...buttonStyle, textAlign: 'left' as 'left', display: 'flex', alignItems: 'center', marginBottom: '10px', marginRight: '10px' }}>
        <input
          type="checkbox"
          checked={selectedSubCategories.includes(subCategory)}
          onChange={() => {
            console.log('Subcategory clicked:', subCategory);
            if (selectedSubCategories.includes(subCategory)) {
              setSelectedSubCategories(selectedSubCategories.filter(sc => sc !== subCategory));
            } else {
              setSelectedSubCategories([...selectedSubCategories, subCategory]);
            }
          }}
        />
        {subCategory}
      </label>
    ))}
  </div>
)}
<h2 style={{ marginTop: '20px' }}>Document Queue:</h2>

{selectedSubCategories.map(subCategory => {
  const filteredData = newData.filter(data => data.subCategory === subCategory);
  if (filteredData.length === 0) {
    return <p key={subCategory}>No data available for {subCategory}</p>
  }
  return null;
})}

{selectedSubCategories.map(subCategory => {
  const filteredData = newData.filter(data => data.subCategory === subCategory);
  return filteredData.map((data, index) => (
    <div key={index} style={boxStyle}>
      <h2 style={{ color: '#0000FF' }}>SubCategory: {data.subCategory}</h2>
      <p>Document Title{data.image}</p>
      <a href={data.url} download target="_blank">
        <button style={buttonStyle}>Download</button>
      </a>
    </div>
  ));
})}
</div>
);
}