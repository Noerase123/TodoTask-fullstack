import React, { useState } from 'react';
import { IonList, IonItem, IonLabel, IonInput,
   IonItemSliding, IonItemOption, IonItemOptions, 
   IonContent, IonButton 
} from '@ionic/react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import axios from 'axios'

const Home: React.FC = () => {
  
  interface Iitems {
    _id: string,
    title: string,
    container: string,
    dateCreated: string
  }

  const [text,setText] = useState("");
  const [obj, setObj] = useState<Iitems[]>([]);

  React.useEffect(() => {
    fetchData()
  }, [])

  const url = 'http://127.0.0.1:3030/api/todo/'

  const fetchData = () => {
    axios.get(url)
      .then(res => {
        console.log(res.data.data);
        setObj(res.data.data)
      })
      .catch(err => {
        console.log(err);
        
      })
  }

  const addList = () => {
    const payload = {
      title: text
    }
    axios.post(url, payload)
      .then(res => {
        console.log(res);
        fetchData()
      })
      .catch(err => {
        console.log(err);
      })
  }

  const deleteList = (id: string) => {
    axios.delete(url + id)
      .then(res => {
        console.log(res);
        fetchData()
      })
      .catch(err => {
        console.log(err);
      })
  }

  const viewList = (id: string) => {
    axios.get(url + id)
      .then(res => {
        console.log(res.data.item)
        console.log(res.data.data)
        localStorage.setItem('url', url + id)
        window.location.replace('http://127.0.0.1:8100/view?id=' +id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonList>
        <IonItem>
          <IonLabel position="floating">Input Title</IonLabel>
          <IonInput onIonChange={e => setText(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton expand="block" size="default" onClick={addList}>
            Submit
        </IonButton>
      </IonList>
  
      {/*-- List of Sliding Items --*/}
      <IonList>
        {obj?.map(res => {
          
          return (
            <IonItemSliding key={res._id}>
              <IonItem>
              <IonLabel> {res.title} </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption onClick={() => viewList(res._id) }>View</IonItemOption>
                <IonItemOption color="danger" onClick={() => deleteList(res._id) }>Delete</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          )
        } )}

      </IonList>
    </IonContent>
  );
}

export default Home