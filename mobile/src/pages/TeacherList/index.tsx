import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { View, ScrollView, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';


import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([])

  const [isFiltersVisible, setIsFiltersVisivle] = useState(false)

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersIds = favoritedTeachers.map((i: Teacher) => i.id)
        setFavorites(favoritedTeachersIds)
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites();
  })

  function handleTogleFiltersVisible() {
    setIsFiltersVisivle(!isFiltersVisible)
  }

  async function handleFiltersSubmit() {
    loadFavorites();
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setTeachers(response.data)
    setIsFiltersVisivle(false)

  }

  return (
  <View style={styles.container}>
    <PageHeader  
      title="Proffys disponíveis" 
      headerRight={(
        <BorderlessButton onPress={handleTogleFiltersVisible}>
          <Feather name="filter" size={20} color='#FFF' />
        </BorderlessButton>
      )}
    >
      {isFiltersVisible && (
        <View style={styles.searchForm}>
          <Text style={styles.label}>Matéria</Text>
          <TextInput 
            style={styles.input}
            placeholder="Qual a matéria?"
            value={subject}
            onChangeText={text => setSubject(text)}
            placeholderTextColor="#c1bccc"
          />

          <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Dia da Semana</Text>
              <TextInput 
                style={styles.input}
                placeholder="Qual o dia?"
                value={week_day}
                onChangeText={text => setWeekDay(text)}
                placeholderTextColor="#c1bccc"
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Horário</Text>
              <TextInput 
                style={styles.input}
                placeholder="Qual horário?"
                value={time}
                onChangeText={text => setTime(text)}
                placeholderTextColor="#c1bccc"
              />
            </View>
          </View>
          
          <RectButton 
            style={styles.submitButton} 
            onPress={handleFiltersSubmit}
          >
            <Text style={styles.submitButtonText}>Filtrar</Text>
          </RectButton>
        </View>
      ) }
    </PageHeader>

    <ScrollView
      style={styles.teacherList}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16
      }}
    >
      {teachers.map((teacher: Teacher) => (
        <TeacherItem 
          key={teacher.id} 
          teacher={teacher} 
          favorited={favorites.includes(teacher.id)}
        />
        
      ))}
    </ScrollView>

  </View>
  );
}

export default TeacherList;