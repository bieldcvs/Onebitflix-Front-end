import courseService from '@/src/services/courseService';
import useSWR from 'swr';
import SlideComponent from '../../common/slideComponent';
import styles from "../../../../styles/slideCategory.module.scss";
import Pagespinner from '../../common/spinner';
const NewestCategory = function () {
  const {data,error} = useSWR("/newest",courseService.getNewstCourses)

  if (error) return error;
  if (!data) {
    return <Pagespinner/>
  }
  return(<>
  <p className={styles.titleCategory}>LANÇAMENTOS</p>
  <SlideComponent course={data.data}/>
  </>)
}

export default NewestCategory;