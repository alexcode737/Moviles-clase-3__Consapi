import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios'; // Es un consumidor de apis

export default function App () {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idSearch,setIdSearch] = useState('') 
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('')

//   const getUsers = async () => {
//      try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/users');
//       const json = await response.json();
//       setData(json);
//     } catch (error) { 
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const getUsersById = async (id) => {
//     try {
//      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//      const json = await response.json();
//      setData(json);
//      if(json.name != null){
//       setName(json.name)
//       setEmail(json.email)
//      }
//      else{
//       alert("El id del usuario no existe. Intentalo con otro")
//      }
//    } catch (error) { 
//      console.error(error);
//    } finally {
//      setLoading(false);
//    }
//  }

const saveCliente = async () => {
  if (!nombre.trim() || !apellidos.trim()) {
    alert("Nombre y apellidos son obligatorios");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.post(`http://172.16.61.66:3000/api/clientes`, {
      nombre,
      apellidos,
    });
    alert("Cliente agregado correctamente ...")
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

const updateCliente = async (id) => {
  setLoading(true);
  try {
    const response = await axios.put(`http://192.168.1.9:3000/api/clientes/${id}`, {
      nombre,
      apellidos,
    });
    alert("Cliente actualizado correctamente ...")
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

const deleteCliente = async (id) => {
  setLoading(true);
  try {
    if(confirm(`Esta seguro de eliminar el cliente ?`)){
      const response = await axios.delete(`http://192.168.1.9:3000/api/clientes/${id}`);
      alert("Cliente eliminado correctamente ...")
    }
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

const getClientes = async () => {
  // if (!nombre.trim() || !apellidos.trim()) {
  //   alert("Nombre y apellidos son obligatorios");
  //   return;
  // }
  setLoading(true);
  try {
    const response = await axios.get(`http://172.16.61.66:3000/api/clientes`);
    setData(response.data);
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

const getclientePorId = async (id) => {
  // if (!nombre.trim() || !apellidos.trim()) {
  //   alert("Nombre y apellidos son obligatorios");
  //   return;
  // }
  setLoading(true);
  try {
    const response = await axios.get(`http://172.16.61.66:3000/api/clientes/${id}`);
    setData(response.data);
    if(response.data.nombre != null){
      //Vamos a actualizar los estados de nombre y apellidos
      setNombre(response.data.nombre)
      setApellidos(response.data.apellidos)
    }
    else {
      alert("El id del cliente no existe, intentelo con otro")
    }
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

  useEffect(() => {
    //getUsers(); //Se ejecutara este metodo al iniciar por primera vez el componente
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.touchables,{backgroundColor:'green'}]}
        onPress={() => getClientes()}
      >
        <Text style={{color:'white'}}>Listar clientes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.touchables,{backgroundColor:'white'}]}
        onPress={() => getclientePorId(idSearch)}
      >
        <Text style={{color:'blue'}}>Buscar por id</Text>
      </TouchableOpacity>

      <TextInput 
        style={styles.input}
        placeholder="Ingrese el id del cliente a buscar"
        onChangeText={idSearch => setIdSearch(idSearch) }
        value={idSearch}
      />

      <TextInput
        style={styles.input}
        onChangeText={nombre => setNombre(nombre)}
        value={nombre}
      />

      <TextInput
        style={styles.input}
        onChangeText={apellidos => setApellidos(apellidos)}
        value={apellidos}
      />

      <TouchableOpacity
        style={[styles.touchables,{backgroundColor:'blue'}]}
        onPress={() => saveCliente()}
      >
        <Text style={{color:'white'}}>Guardar cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.touchables,{backgroundColor:'purple'}]}
        onPress={() => updateCliente(idSearch)}
      >
        <Text style={{color:'white'}}>Actualizar cliente</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.touchables,{backgroundColor:'red'}]}
        onPress={() => deleteCliente(idSearch)}
      >
        <Text style={{color:'white'}}>Eliminar cliente</Text>
      </TouchableOpacity>

      {isLoading ? <ActivityIndicator size='large' color={'blue'} /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.touchables,{backgroundColor:'orange'}]}
              onPress={() => {
                //alert(`Correo: ${item.email}, Usuario: ${item.username}`)
                if(confirm(`Esta seguro de borar el cliente? : ${item.nombre}`)){
                  alert("El cliente se borro correctamente...");
                }
              }}
            >
              <Text style={{color:'white',fontWeight:'bold'}}>{item.nombre} {item.apellidos}</Text>
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
