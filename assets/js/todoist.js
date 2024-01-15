// ┌┬┐┌─┐┌┬┐┌─┐┬┌─┐┌┬┐
//  │ │ │ │││ ││└─┐ │ 
//  ┴ └─┘─┴┘└─┘┴└─┘ ┴ 
// Todoist integration made by PaleVulpo

const getTodoistEntries = async () => {
  const req = new Request('https://api.todoist.com/rest/v2/tasks', { headers: { Authorization: `Bearer ${CONFIG.todoistKey}` } })

  const response = await fetch(req);
  const data = await response.json();
  
  const currentDate = new Date();
  return data.filter((entry) => entry.due && new Date(entry.due.date) <= currentDate);
}

const generateTodoistList = async () => {
  const listContainer = document.getElementById('todoist');
  if (listContainer) {
    const entries = await getTodoistEntries();
    
    for (const entry of entries) {
      listContainer.innerHTML += `
      <a target="${CONFIG.openInNewTab ? '_blank' : ''}"
      href="${entry.url}"
      class="listItem"
      >${entry.content}</a>
    `;
    }
  }
}

generateTodoistList();
