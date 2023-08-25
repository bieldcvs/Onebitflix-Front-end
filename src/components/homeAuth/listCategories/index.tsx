import categoriesService, { CategoryType } from '@/src/services/categoriesService';
import useSWR from 'swr';
import ListCategoriesSlide from '../listCategoriesSlide';
import Pagespinner from '../../common/spinner';
const ListCategories = function () {
   
  const {data,error} = useSWR("/listCategories",categoriesService.getCategories)

  if (error) return error;
  if (!data) {
    return <Pagespinner/>
  }

  return(
    <>
      {data.data.categories?.map((category : CategoryType)=>(
       <ListCategoriesSlide
       key={category.id}
       categoryId={category.id}
       categoryName={category.name}
        />
      ))}
    </>
  )
}

export default ListCategories;