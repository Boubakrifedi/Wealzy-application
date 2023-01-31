module.exports.TaskErrors = (err) => {
  let errors = { title: "", description: "", dueDate: "" };

  if (err.message.includes("title")) errors.title = "Title is incorrect";

  if (err.message.includes("description"))
    errors.description = "Description is incorrect";

  if (err.message.includes("dueDate")) errors.dueDate = "Due date is incorrect";

  if (err.message.includes("required")) {
    if (err.message.includes("title")) errors.title = "Title is required";

    if (err.message.includes("description"))
      errors.description = "Description is required";

    if (err.message.includes("dueDate"))
      errors.dueDate = "Due date is required";
  }

  if (err.message.includes("minlength")) {
    if (err.message.includes("title"))
      errors.title = "Title must be at least 5 characters long";

    if (err.message.includes("description"))
      errors.description = "Description must be at least 10 characters long";
  }

  if (err.message.includes("maxlength")) {
    if (err.message.includes("title"))
      errors.title = "Title cannot exceed 50 characters";

    if (err.message.includes("description"))
      errors.description = "Description cannot exceed 200 characters";
  }

  return errors;
};
module.exports.ProjectErrors = (err) => {
  let errors = { title: "", description: "", startDate: "", endDate: "" };

  if (err.message.includes("title")) errors.title = "Title is incorrect";

  if (err.message.includes("description"))
    errors.description = "Description is incorrect";

  if (err.message.includes("startDate"))
    errors.startDate = "Start date is incorrect";

  if (err.message.includes("endDate")) errors.endDate = "End date is incorrect";

  if (err.message.includes("required")) {
    if (err.message.includes("title")) errors.title = "Title is required";

    if (err.message.includes("description"))
      errors.description = "Description is required";

    if (err.message.includes("startDate"))
      errors.startDate = "Start date is required";

    if (err.message.includes("endDate"))
      errors.endDate = "End date is required";
  }

  if (err.message.includes("minlength")) {
    if (err.message.includes("title"))
      errors.title = "Title must be at least 5 characters long";

    if (err.message.includes("description"))
      errors.description = "Description must be at least 10 characters long";
  }

  if (err.message.includes("maxlength")) {
    if (err.message.includes("title"))
      errors.title = "Title cannot exceed 50 characters";

    if (err.message.includes("description"))
      errors.description = "Description cannot exceed 200 characters";
  }

  return errors;
};
