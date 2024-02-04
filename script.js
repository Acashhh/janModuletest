document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');
    const taskCount = document.getElementById('taskCount');
  
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const taskName = document.getElementById('taskName').value;
      const dueDate = document.getElementById('dueDate').value;
      const priority = document.getElementById('priority').value;
  
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.dataset.priority = priority; // Adding data-priority attribute
      taskItem.innerHTML = `
        <span>${taskName}</span> - <span>${dueDate}</span> - <span>${priority}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      `;
  
      taskList.appendChild(taskItem);
  
      // Clear form fields
      taskForm.reset();
  
      // Update task count
      updateTaskCount();
    });
  
    taskList.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        updateTaskCount();
      }
  
      if (e.target.classList.contains('edit-btn')) {
        const taskText = e.target.parentElement.querySelector('span').textContent;
        const taskInput = document.createElement('input');
        taskInput.value = taskText;
        e.target.parentElement.replaceChild(taskInput, e.target);
        taskInput.focus();
  
        taskInput.addEventListener('blur', function() {
          const newTaskText = taskInput.value;
          const newTaskSpan = document.createElement('span');
          newTaskSpan.textContent = newTaskText;
          taskInput.parentElement.replaceChild(newTaskSpan, taskInput);
        });
      }
    });
  
    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();
      const tasks = document.querySelectorAll('.task-item');
  
      tasks.forEach(function(task) {
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(searchTerm)) {
          task.style.display = 'block';
        } else {
          task.style.display = 'none';
        }
      });
    });
  
    function updateTaskCount() {
      const tasks = document.querySelectorAll('.task-item');
      let highCount = 0;
      let mediumCount = 0;
      let lowCount = 0;
  
      tasks.forEach(function(task) {
        const priority = task.dataset.priority;
        if (priority === 'high') {
          highCount++;
        } else if (priority === 'medium') {
          mediumCount++;
        } else if (priority === 'low') {
          lowCount++;
        }
      });
  
      taskCount.innerHTML = `High Priority: ${highCount} | Medium Priority: ${mediumCount} | Low Priority: ${lowCount}`;
    }
  });
  