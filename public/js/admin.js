const mainImgInput = document.getElementById('mainImg');
const otherImgInput = document.getElementById('otherImg');
const largeGalleryImg = document.querySelector('.gallery--large img');
const smallGalleryImg = document.querySelectorAll('.galleryCmp__item:not(.gallery--large) img');
const gallery = document.querySelector('.galleryCmp');
const iconContainers = document.querySelectorAll('.editBlock__icon');


const editButtons = document.querySelectorAll(".admin-edit");
const removeButtons = document.querySelectorAll(".admin-remove");
const statusChangeButtons = document.querySelectorAll(".status-change");
const editModal = document.querySelector(".editModal");
const addPost = document.querySelector('.admin__addButton')
const form = document.getElementById('postForm'); 

addPost.addEventListener('click', function(e){
    editModal.style.display = "block";
})






  removeButtons.forEach(button => {
      button.addEventListener("click", () => {
          const postId = button.getAttribute("data-post-id");
          deletePost(postId);
      });
  });

  async function deletePost(postId) {
      try {
          const response = await fetch(`/admin/api/posts/${postId}`, {
              method: "DELETE"
          });

          if (response.ok) {
            location.reload();
          } else {
              console.error("Ошибка при удалении поста");
          }
      } catch (error) {
          console.error("Произошла ошибка", error);
      }
    }

  statusChangeButtons.forEach(button => {
            button.addEventListener("click", () => {
                const postId = button.getAttribute("data-post-id");
                changeStatus(postId);
            });
        });

    async function changeStatus(postId) {
            try {
                const response = await fetch(`/admin/api/posts/${postId}/change-status`, {
                    method: "PATCH" // Используем метод PATCH для обновления данных
                });

                if (response.ok) {
                  location.reload();
                } else {
                    console.error("Ошибка при изменении статуса");
                }
            } catch (error) {
                console.error("Произошла ошибка", error);
            }
          }
    
    
    
    
    
editButtons.forEach(button => {
    button.addEventListener("click", async () => {
        const postId = button.getAttribute("data-post-id");
        const response = await fetch(`/admin/api/posts/edit/${postId}`);
        const post = await response.json();
        editModal.querySelector("#address").value = post.address;
        editModal.querySelector("#title").value = post.title;
        editModal.querySelector("#small-description").value = post.smallDescription;
        editModal.querySelector("#conveniences").value = post.conveniences.join(", ");
        editModal.querySelector("#entertainments").value = post.entertainments.join(", ");
        editModal.querySelector("#yardEntertainments").value = post.yardEntertainments.join(", ");
        editModal.querySelector("#additionalInformation").value = post.additionalInformation;
        editModal.querySelector("#buttonId").value = post.buttonId;
        editModal.querySelector("#buttonId").readOnly ='true';
        editModal.querySelector(`input[name="status"]:checked`).value = post.status;
        editModal.querySelector(`#cost`).value = post.cost;
        editModal.querySelector(`#square`).value = post.square;
        editModal.querySelector(`#mapScript`).value = post.mapScript;
        editModal.style.display = "block";
    });
});


// Обработчик для закрытия модального окна
const closeButton = editModal.querySelector(".cross__container");
closeButton.addEventListener("click", () => {
    editModal.style.display = "none";
});




  mainImgInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; 
    const imageUrl = URL.createObjectURL(file); 
  
    largeGalleryImg.src = imageUrl

    gallery.style.display='block'
  
    
   
  });




  otherImgInput.addEventListener('change', (event) => {
    const files = event.target.files; 
    

    
    for (let i = 0; i < smallGalleryImg.length; i++) {
        const img = smallGalleryImg[i];
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
    
        img.src = imageUrl;
    }
    
    gallery.style.display='block'

  });



const convIcons = []; 
const convDescrs = [];



iconContainers.forEach(iconContainer => {
    const iconImg = iconContainer.querySelector('img');
    const iconDescr = iconContainer.querySelector('.editBlock__txt');
  
    iconContainer.addEventListener('click', () => {
      if (iconImg && iconDescr) {
        const iconSrc = iconImg.getAttribute('src');
        const descrContent = iconDescr.textContent;
  
        if (iconContainer.classList.contains('selected')) {
          // Если класс уже есть, удалить его и удалить иконку из массивов
          iconContainer.classList.remove('selected');
          const iconIndex = convIcons.indexOf(iconSrc);
          if (iconIndex !== -1) {
            convIcons.splice(iconIndex, 1);
            convDescrs.splice(iconIndex, 1);
          }
        } else {
          // Если класса нет, добавить его и добавить иконку в массивы
          iconContainer.classList.add('selected');
          convIcons.push(iconSrc);
          convDescrs.push(descrContent);
        }
      }
      
    });
  });





  function validation(form){

    let result = true;

    function createError(input, text){
      let parent = input.parentNode;
      let spanError = document.createElement('span');
      spanError.textContent = text;
      parent.append(spanError);
      parent.classList.add('error');
    }


    function removeError(input){

      let parent = input.parentNode;
      if(parent.classList.contains('error')){

        parent.querySelector('span').remove()
        parent.classList.remove('error');

      }
    }

let inputs = document.querySelectorAll('.editModal__input input')
  for (let input of inputs){
    removeError(input)
    if(input.value == ''){
      createError(input, 'Поле обязательно для заполнения*');
      result = false;
    }
  }
return result

}










  const postForm = document.getElementById('postForm');

  postForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if(!validation(postForm)){
  
      return;
    }
    const formData = new FormData(postForm);

    formData.append('advantagesIcon', JSON.stringify(convIcons));
    formData.append('advantagesDescription', JSON.stringify(convDescrs));
  
    try {
      const response = await fetch('/admin/create-post', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post created:', data);
        location.reload();
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });

  

