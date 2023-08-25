import useSWR from 'swr';
import styles from "../../../../styles/slideCategory.module.scss";
import courseService from '@/src/services/courseService';
import SlideComponent from '../../common/slideComponent';
import Pagespinner from '../../common/spinner';

const FeaturedCategory = function () {
  
  const {data,error} = useSWR("/featured",courseService.getFeaturedCourse)

  if (error) return error;
  if (!data) {
    return <Pagespinner/>
  }

  return(
    <>
      <p className={styles.titleCategory}>EM DESTAQUE</p>
      <SlideComponent course={data.data}/>
    </>
  )
}

export default FeaturedCategory;