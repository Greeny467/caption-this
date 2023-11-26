import './Feed.css'
import Post from '../../components/Post'

export default function Feed() {
  return (
        <div className="main_container">
          <Post href={'#link'} img={'https://picsum.photos/600/800'}>I SHOULD ADD UPVOTES FIRST AND THAN FIGURE OUT THE POST MAYBEE IDK</Post>
          <Post>ITS 4AM, IM TOO BORED TO BE DOING THIS</Post>
          <Post href={'#link'} img={'https://placekitten.com/600/400'}>STILL WORKING ON THE STRUCTURE</Post>
          <Post href={'#link'} img={'https://picsum.photos/1600/800'}>THIS IS WHERE THE POSTS WILL BE RENDERED</Post>
          <Post href={'#link'} img={'https://picsum.photos/900/800'}>STILL WORKING ON THE STRUCTURE</Post>
        </div>
  );
}
