import type { Book } from "@/types"

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    price: 19.99,
    coverImage: "/cien-anos-de-soledad-cover.png",
    description:
      "Una de las obras más importantes de la literatura latinoamericana. Narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
    isbn: "978-0307474728",
    pages: 417,
    publishYear: 1967,
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    price: 15.5,
    coverImage: "/book-cover-1984.png",
    description:
      "Una novela distópica que presenta una sociedad totalitaria vigilada por el Gran Hermano, donde se manipula la información y se controla el pensamiento de las personas.",
    isbn: "978-0451524935",
    pages: 328,
    publishYear: 1949,
  },
  {
    id: "3",
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    price: 12.99,
    coverImage: "/el-principito-cover.png",
    description:
      "Una fábula poética que aborda temas profundos como el sentido de la vida, la amistad y el amor, a través de la historia de un pequeño príncipe que viaja por diferentes planetas.",
    isbn: "978-0156012195",
    pages: 96,
    publishYear: 1943,
  },
  {
    id: "4",
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    price: 24.99,
    coverImage: "/don-quijote-cover.png",
    description:
      "Considerada la primera novela moderna y una de las obras más importantes de la literatura universal. Narra las aventuras de un hidalgo que enloquece por la lectura de libros de caballerías.",
    isbn: "978-8420412146",
    pages: 863,
    publishYear: 1605,
  },
  {
    id: "5",
    title: "Harry Potter y la piedra filosofal",
    author: "J.K. Rowling",
    price: 17.95,
    coverImage: "/magical-school-cover.png",
    description:
      "Primera entrega de la serie Harry Potter. Narra las aventuras de un joven mago, huérfano y con una cicatriz en forma de rayo, que descubre su verdadera identidad y asiste a una escuela de magia.",
    isbn: "978-8478884452",
    pages: 309,
    publishYear: 1997,
  },
  {
    id: "6",
    title: "Crimen y castigo",
    author: "Fiódor Dostoyevski",
    price: 18.5,
    coverImage: "/crimen-y-castigo-cover.png",
    description:
      "Una novela psicológica que explora la mente de Raskólnikov, un estudiante que comete un asesinato y lucha con su conciencia y culpa.",
    isbn: "978-8420674209",
    pages: 671,
    publishYear: 1866,
  },
  {
    id: "7",
    title: "Orgullo y prejuicio",
    author: "Jane Austen",
    price: 14.99,
    coverImage: "/orgullo-y-prejuicio-cover.png",
    description:
      "Una novela romántica que retrata la vida de la familia Bennet y las relaciones sociales en la Inglaterra rural del siglo XIX, centrándose en la historia de amor entre Elizabeth Bennet y Mr. Darcy.",
    isbn: "978-8497940246",
    pages: 424,
    publishYear: 1813,
  },
  {
    id: "8",
    title: "La sombra del viento",
    author: "Carlos Ruiz Zafón",
    price: 21.99,
    coverImage: "/sombra-viento-cover.png",
    description:
      "Una novela que mezcla intriga, historia y amor, ambientada en la Barcelona de posguerra. El protagonista descubre un libro maldito que cambiará el rumbo de su vida.",
    isbn: "978-8408163381",
    pages: 544,
    publishYear: 2001,
  },
]
