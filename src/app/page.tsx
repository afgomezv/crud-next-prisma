import TaskCard from "@/components/TaskCard";
import { prisma } from "@/libs/prisma";
import axios from "axios";

//* with axios
// async function loadTasks() {
//   const res = await axios.get("http://localhost:3000/api/tasks");
//   console.log(res);
// }

//* with Prisma
async function loadTasks() {
  return await prisma.task.findMany();
}

//export const revalidate = 60;
export const dynamic = "force-dynamic";

async function HomePage() {
  const tasks = await loadTasks();

  return (
    <div className="grid grid-cols-3 gap-3 p-6 mt-8">
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}

export default HomePage;
