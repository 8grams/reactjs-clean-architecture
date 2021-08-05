export const getPhotoFromLocal = () => {
  const favoritePhoto = localStorage.getItem("favoritePhoto");
  if (!favoritePhoto) return [];
  if (favoritePhoto) return JSON.parse(favoritePhoto);
};

export const getCommentFromLocal = () => {
  const comment = localStorage.getItem("comment");
  if (!comment) return [];
  if (comment) return JSON.parse(comment);
};

export const setPhotoToLocal = (photoId: number, isFavorite: boolean) => {
  const photos = getPhotoFromLocal();

  if (!isFavorite) {
    const unfavorite = photos.filter((item: any) => item !== photoId);
    console.log("un", unfavorite);
    localStorage.setItem("favoritePhoto", JSON.stringify(unfavorite));
    
  } else {
    photos.push(photoId);
    localStorage.setItem("favoritePhoto", JSON.stringify(photos));
  }
  
};

export const setCommentToLocal = ({
  photoId,
  value,
}: {
  photoId: number;
  value: string;
}) => {
  const comment = getCommentFromLocal();
  comment.push({ photoId, comment: value });
  localStorage.setItem("comment", JSON.stringify(comment));
};
