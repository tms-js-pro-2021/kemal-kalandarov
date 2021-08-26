import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../../api';
import { applicationSlice, store } from '../../../redux';
import TodoItem, { TodoItemType } from '../TodoItem/TodoItem';
// import { useTodoContext } from '../TodoContext';

// enum Enum1 {
//   completed = 404,
//   default = 2,
//   started = 3,
// }

// function fn1(a: Enum1) {
//   console.log((a = Enum1.completed));
// }

// interface StoreType {
//   todos: {
//     byId: {
//       [key: string]: TodoItemType;
//     };
//     allIds: string[];
//   };
// }

// abstract class Animal {
//   abstract makeSound(): void;
//   static sound: string;
// }

// interface IWalker {
//   walk(): void;
// }

// interface ICat extends Animal, IWalker {}

// class Cat implements ICat {
//   protected sound: string;
//   makeSound() {
//     console.log('мяу');
//   }
//   walk() {
//     this.sound;
//   }
// }

// class Shpinx extends Cat {
//   walk() {
//     this.sound;
//   }
// }

// class Dog extends Animal {
//   makeSound() {
//     console.log('гав');
//   }
//   walk() {}
// }

// class Fish extends Animal {
//   makeSound() {
//     console.log('гав');
//   }
//   walk() {
//     throw new Error();
//   }
// }

// const a = new Cat();

// interface AnimalType {
//   walkString: string;
//   sound: string;
// }

// interface IWalk {
//   walk: Function;
// }

// function addWalk(animal: AnimalType): <AnimalType, IWalk> {
//   animal.walk = () => console.log(animal.walkString)
// }

// const cat = { sound: 'мяу', walkString: 'хожу' };
// const fish = { sound: 'мяу' };
// const walkingCat = addWalk(cat);

export default function TodoList(props) {
  // const { isLoading } = useTodoContext();

  const { setTodos } = applicationSlice.actions;

  useEffect(() => {
    api.get('/todos').then(res => setTodos(res.data));
  }, []);
  const todoIds = useSelector(state => state.todos.allIds);

  const isEmpty = todoIds.length === 0;
  // TODO: при ошибке рендерятся 10 туду айтемов без данных
  return (
    <ul>
      {(isEmpty ? [...Array(10)] : todoIds).map((id, i) => (
        <TodoItem key={id || i} id={id} />
      ))}
    </ul>
  );
}
