import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function App () {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idSearch,setIdSearch] = useState('') 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const getUsers = async () => {
     try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) { 
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getUsersById = async (id) => {
    try {
     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
     const json = await response.json();
     setData(json);
     if(json.name != null){
      setName(json.name)
      setEmail(json.email)
     }
     else{
      alert("El id del usuario no existe. Intentalo con otro")
     }
   } catch (error) { 
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

  useEffect(() => {
    //getUsers(); //Se ejecutara este metodo al iniciar por primera vez el componente
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.touchables,{backgroundColor:'green'}]}
        onPress={() => getUsers()}
      >
        <Text style={{color:'white'}}>Listar usuarios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.touchables,{backgroundColor:'white'}]}
        onPress={() => getUsersById(idSearch)}
      >
        <Text style={{color:'blue'}}>Buscar por id</Text>
      </TouchableOpacity>

      <TextInput 
        style={styles.input}
        placeholder="Ingrese el id de usuario"
        onChangeText={idSearch => setIdSearch(idSearch) }
        value={idSearch}
      />

      <TextInput
        style={styles.input}
        onChange={name => setName(name)}
        value={name}
      />

      <TextInput
        style={styles.input}
        onChange={email => setEmail(email)}
        value={email}
      />

      {isLoading ? <ActivityIndicator size='large' color={'blue'} /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.touchables,{backgroundColor: item.id % 2 == 1 ? 'blue':'gray'}]}
              onPress={() => {
                //alert(`Correo: ${item.email}, Usuario: ${item.username}`)
                if(confirm(`Esta seguro de borar el usuario? : ${item.name}`)){
                  alert("El usuario se borro correctamente...");
                }
              }}
            >
              <Text style={{color:'white',fontWeight:'bold'}}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchables:{
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    height:50,
    marginBottom:15
  },
  input:{
    borderColor:'green',
    borderWidth:1,
    borderRadius:8,
    marginTop:10,
    textAlign:'center',
    padding:5
  }
});
