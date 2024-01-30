document.addEventListener("DOMContentLoaded", function () {
    const mooviesContainer = document.getElementById("moovies-container");
  
    async function fecthMoovies() {
      try {
        const res = await fetch("http://localhost:3000/moovies");
        const moovies = await res.json();
  
        displayMoovies(moovies);
      } catch (error) {
        console.log("Erro ao buscar filmes: ", error.message);
      }
    }
  
    function displayMoovies(moovies) {
      mooviesContainer.innerHTML = "";
  
      moovies.forEach((moovie) => {
        const moovieCard = document.createElement("div");
        moovieCard.classList.add("col");
  
        moovieCard.innerHTML = `
          <div class="card" style="height: 226px;">
              <div class="card-body p-0">
                  <h5 class="card-title m-0 p-1">${moovie.title}</h5>
                  <small class="p-1">${moovie.category_name}</small>
                  <p class="card-text mt-2 p-1">${moovie.description}</p>
                  <small class="card-text mt-2 p-1">${
                    moovie.category_description
                  }</small>
                  <div class="card-footer text-muted text-end">${
                    moovie.realease_date ?? "01/01/2024"
                  }</div>
              </div>
          </div> 
        `;
  
        mooviesContainer.appendChild(moovieCard);
      });
    }
  
    fecthMoovies();
  });