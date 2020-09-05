import React, { useState } from 'react';
import { IonList, IonItem, IonLabel, IonInput,
    IonItemSliding, 
   IonItemOption, IonItemOptions, IonContent, IonButton 
} from '@ionic/react';

import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import axios from 'axios'

const View: React.FC = () => {
  
  interface Iitems {
    _id: string,
    title: string,
    container: string,
    dateCreated: string
  }

  const [text,setText] = useState("");
  const [obj, setObj] = useState<Iitems[]>([]);
  const [title, setTitle] = useState<string>("");

  React.useEffect(() => {
    fetchData()
  }, [])

  const url = localStorage.getItem('url') as string

  const apiUrl = 'http://127.0.0.1:3030/api/todo/'

  const fetchData = () => {
    axios.get(url)
      .then(res => {
        setObj(res.data.data)
        setTitle(res.data.item.title)
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
    axios.delete(apiUrl + id)
      .then(res => {
        console.log(res);
        fetchData()
      })
      .catch(err => {
        console.log(err);
      })
  }

  const viewList = (id: string) => {
    axios.get(apiUrl + id)
      .then(res => {
        console.log(res.data.item)
        console.log(res.data.data)
        window.location.replace('http://127.0.0.1:8100/subview?id=' +id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <IonContent>
      <IonHeader>
          <IonToolbar>
          <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
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
        {obj?.map(res => (
          <IonItemSliding key={res._id}>
            <IonItem>
            <IonLabel> {res.title} </IonLabel>
            </IonItem>
            <IonItemOptions side="end">
                <IonItemOption onClick={() => viewList(res._id) }>View</IonItemOption>
              <IonItemOption color="danger" onClick={() => deleteList(res._id) }>Delete</IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}

      </IonList>
    </IonContent>
  );
}

export default View