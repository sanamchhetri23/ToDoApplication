import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Switch, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      setTasks([...tasks, { title: newTaskTitle, status: false }]);
      setNewTaskTitle('');
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
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
    </NavigationContainer>
  );
};

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      setTasks([...tasks, { title: newTaskTitle, status: false }]);
      setNewTaskTitle('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Task"
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
      />
      <Button title="Add Task" onPress={addTask} disabled={!newTaskTitle.trim()} />

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
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const TaskItem = ({ task, onStatusChange, onDelete }) => (
  <View style={styles.taskItem}>
    <View style={styles.taskStatus}>
      <Text style={styles.taskText}>
        {task.title}</Text>
      <Text style={{ color: task.status ? 'green' : 'red' }}>-
        {task.status ? 'Done' : 'Due'}
      </Text>
    </View>
    <View style={styles.statusDeleteContainer}>
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
  input: {
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
  taskText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  statusDeleteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 10,
  }
});

export default ToDoApp;
