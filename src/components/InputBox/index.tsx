import { ChangeEvent, Dispatch, SetStateAction, forwardRef,KeyboardEvent } from 'react'
import './style.css';
import { deflate } from 'zlib';


//             interface: Input Box 컴포넌트 Properties             //
interface Props {
  label: string,
  type: 'text' | 'password';
  placeholer: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error: boolean;

  icon?: string;
  onButtonClick?: () => void;

  message? : string,

  onKeyDown? : (event: KeyboardEvent<HTMLInputElement>) => void;
}

            // component: Input Box 컴포넌트             //
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {


//             state: properties             //
const {label, type, value, placeholer,　error,icon,message} = props;
const {setValue, onButtonClick, onKeyDown} = props;

//             event handler: input 값 변경 이벤트 처리 함수          //
const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const {value} = event.target;
  setValue(value);
};

//             event handler: Keyboard 이벤트 처리 함수
const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if(!onKeyDown) return;
  onKeyDown(event);
};

//             render: Input Box 랜더링             //
  return (
    <div className='inputbox'>
      <div className='inputbox-label'>{label}</div>
      <div className= {error ? 'inputbox-container-error' : 'inputbox-container'}>
        <input ref={ref} type={type} className='input' placeholder={placeholer} value={value} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
        {onButtonClick !== undefined && (
        <div className="icon-button">
        {icon !== undefined && <div className={`icon ${icon}`}></div>}
        </div>
        )}
      </div>
      {message !== undefined && <div className='inputbox-message'>{message}</div>}
    </div>
  )

});

export default InputBox;
