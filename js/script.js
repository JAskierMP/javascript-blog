/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/

  const titleClickHandler = function(event){
  console.log('Link was clicked!');
  console.log(event);
    /* remove class 'active' from all article links  */

  /* add class 'active' to the clicked link */

  /* remove class 'active' from all articles */

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
}

titleClickHandler('Link was clicked!')


const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false}
srcElement: span
tangentialPressure: 0
target: span
tiltX: 0
tiltY: 0
timeStamp: 133012.80000007153
toElement: null
twist: 0
type: "click"
