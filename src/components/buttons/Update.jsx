import { Button } from '../ui/button';

function Update() {
  return (
    <div className='flex justify-end w-full mt-5'>
      <Button onClick={() => alert('Settings Updated!')}>Update</Button>
    </div>
  );
}

export default Update;
