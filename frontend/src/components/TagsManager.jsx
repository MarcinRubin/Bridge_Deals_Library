import { useEffect, useState } from 'react';
import client from '../hooks/axiosClient';
import useToggle from '../hooks/useToggle';
import { DropMenu, DropMenuElement } from './DropMenu';

const TagsManager = () => {

    const [tags, setTags] = useState([]);
    const [currentTags, setCurrentTags] = useState([])
    const [isActive, toggle] = useToggle(false);

    useEffect(() => {
        const fetchTags = async () => {
          try {
            const response = await client.get("/api/tags/");
            setTags(response.data.map(item => item.name));
          } catch (err) {
            console.log(err.message);
          }
        };

        fetchTags();
      }, []);

      const handleTagAdd = (e) =>{
        if (!currentTags.includes(e.target.innerText)){
            setCurrentTags([...currentTags, e.target.innerText])
        }
      }

      const handleTagRemove = (e, idx) => {

        const newTags = currentTags.filter(item => item !== currentTags[idx]);
        setCurrentTags(newTags);
      }



  return (
    <div className="tags-manager-wrapper">
        {currentTags.map((item, idx) => (
            <span className="tags-manager-item" key={idx}>{item}<i className="bi bi-x" onClick={e => handleTagRemove(e, idx)}></i></span>
        ))}
        <span className={"drop-menu-wrapper tags-manager-add"} onClick={toggle}>
            <p>+</p>
            <DropMenu isActive={isActive} xtranslate={0} ytranslate={60} width={100}>
                {
                    tags.map((item, idx)=>(
                        <DropMenuElement key={idx} text={item} handleClick={handleTagAdd}/>
                    ))
                }
            </DropMenu>
        </span>
    </div>
  )
}

export default TagsManager
