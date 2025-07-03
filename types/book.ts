export interface Book {
  id: string              
  title: string
  authorId: number        
  authorName?: string     
  categoryId: number
  categoryName?: string
  publicationDate: string 
  isbn: string
  rating?: number         
  visible: boolean
  summary?: string
  price?: number          
  createdAt?: string      
  updatedAt?: string
  coverImage: string
}
