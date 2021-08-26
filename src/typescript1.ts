



type TodoStatus = 'done'|'not-done'|'doing'
type Letter = 'A'|'B'|'C'

type TodoStatusDashLetter = `${TodoStatus}-${Letter}`



interface ILoggerData {
  message: string
}

interface LoggerDataExtended extends ILoggerData {
  cancelLog: Function
}

interface ILoggerDataObj {
  data?: ILoggerData
}

function logSomething(props?: ILoggerDataObj): void {
  const status: TodoStatusDashLetter = "done-A"
  console.log(props!.data!.message);
}

let str = 1

str = 2
// str = {}
// str = 'true'

console.log(str)

const data1: LoggerDataExtended = {
  message: 'log1',
  cancelLog: () => {}
}

const a = logSomething({ data: data1 })
const aa = logSomething()

const arr1: Array<ILoggerData> = [{
  message: 'q34',
}]

const timeoutPromise = new Promise<Response>((resolve, reject) => {
  fetch('').then(resp => resolve(resp))
  // setTimeout(() => resolve('123'), 500)
}) 


function func1<T>(a: T) : string {
  return a.toString()
}

const b: string = func1(1)


interface Interface1 {
  count: number,
  isCount: boolean,
  [key: string]: string | number | boolean,
}

function func2(arg : Interface1): void {
  console.log(arg.message);
  console.log(arg.message2);
  console.log(arg.message3);
  console.log(arg.message4);
  console.log(arg.message5);
  console.log(arg.count);
}