import categoriesService from '@/src/services/categoriesService';
import useSWR from 'swr';
import SlideComponent from '../../common/slideComponent';
import styles from "../../../../styles/slideCategory.module.scss";
import Pagespinner from '../../common/spinner';

interface props{
  categoryId: number;
  categoryName: string;
}

const ListCategoriesSlide = function ({categoryId , categoryName}:props) {
   
  const {data,error} = useSWR(`/categoriesCourses/${categoryId}`,() => categoriesService.getCourse(categoryId))

  if (error) return error;
  if (!data) {
    return <Pagespinner/>
  }

  return(
    <>
      <p className={styles.titleCategory}>{categoryName}</p>
      <SlideComponent course={data.data.courses} />
    </>
  )
}

export default ListCategoriesSlide;