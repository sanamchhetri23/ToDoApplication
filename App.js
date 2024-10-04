import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Switch, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


const Stack = createStackNavigator();

const ToDoApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ToDoHomeScreen}
          options={{
            title: 'ToDo App',
            headerStyle: {
              backgroundColor: '#0072F5',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
      <Toast/> 
    </NavigationContainer>
  );
};

const ToDoHomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  const addTask = () => {
    if (taskTitle.trim() !== '') {
      setTasks([...tasks, { id: Date.now().toString(), title: taskTitle, status: false }]);
      setTaskTitle('');
      Toast.show({ type: 'success', text1: 'Task added successfully!' });

    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.taskInput}
        placeholder="Enter Your Task"
        value={taskTitle}
        onChangeText={setTaskTitle}
        autoFocus={true}
      />
      <Button title="Add Task" onPress={addTask} disabled={!taskTitle.trim()} />

      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <TaskItem
            task={item}
            onStatusChange={() => {
              const updatedTasks = [...tasks];
              updatedTasks[index].status = !updatedTasks[index].status;
              setTasks(updatedTasks);
            }}
            onDelete={() => {
              const updatedTasks = [...tasks];
              updatedTasks.splice(index, 1);
              setTasks(updatedTasks);
            }}

          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const TaskItem = ({ task, onStatusChange, onDelete }) => (
  <View style={styles.taskItem}>
    <View style={styles.taskStatus}>
      <Text style={styles.titleTask}>
        {task.title}</Text>
      <Text style={{ color: task.status ? 'green' : 'red' }}>-
        {task.status ? 'Done' : 'Due'}
      </Text>
    </View>
    <View style={styles.statusDelete}>
      <Switch value={task.status} onValueChange={onStatusChange} />
      <Button title="Delete" onPress={onDelete} color="#FE0034" />
     </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  taskInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginBottom: 10,
    paddingLeft: 10,
  },

  taskItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },

  taskStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleTask: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  statusDelete: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 10,
  }
});

export default ToDoApp;
