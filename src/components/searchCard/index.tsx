import { CourseType } from '@/src/services/courseService';
import styles from "./style.module.scss";
import Link from 'next/link';

interface props{
  course:CourseType;
}
const SearchCard = function({course}:props){
  return(<>
    <Link href={`/courses/${course.id}`}  style={{textDecoration: 'none'}}>
      <div className={styles.searchCard}>
        <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
        alt={course.name}
        className={styles.searchImg}/>
        <p className={styles.searchCardTitle}>{course.name}</p>
        <p className={styles.searchCardDescription}>{course.synopsis}</p>
        
      </div>
    </Link>
  </>)
}

export default SearchCard;