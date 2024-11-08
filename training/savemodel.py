import tensorflow as tf

model = tf.keras.models.load_model(r"C:\Users\berek\Documents\Data_science_project\potato_classifier\models\1\model.keras")
print(model.summary())
path = r"C:\Users\berek\Documents\Data_science_project\potato_classifier\models\2"
tf.saved_model.save(model,path)