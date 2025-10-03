async function getChefBirthday(id) {
  // recupero la ricetta
  let ricetta;
  try {
    const responseRicetta = await fetch(`https://dummyjson.com/recipes/${id}`);
    ricetta = await responseRicetta.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Errore: Ricetta con id ${id} non recuperata!`);
  }
  if (ricetta.message) {
    throw new Error(ricetta.message);
  }

  // recupero i dati dello chef
  let chef;
  try {
    const responseChef = await fetch(
      `https://dummyjson.com/users/${ricetta.userId}`
    );
    chef = await responseChef.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Errore: Chef con id ${ricetta.userId} non recuperato!`);
  }
  if (chef.message) {
    throw new Error(chef.message);
  }

  // restituisco la data di nascita dello chef
  // return chef.birthDate;

  // uso dayjs per la formattazione
  const birthday = dayjs(chef.birthDate).format("DD/MM/YYYY");
  return birthday;
}

// uso della funzione
(async () => {
  try {
    const birthday = await getChefBirthday(7);
    console.log("Data di nascita dello chef:", birthday);
  } catch (error) {
    console.error("Errore:", error.message);
  }
})();
