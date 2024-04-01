import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          sidebar: {
            home: "Home",
            myCollections: "My collections",
            signIn: "Sign In",
            signOut: "Sign Out",
          },
          home: {
            part1: {
              title: "Recently added items",
              noItems: "No new items have been added in the last 24 hours.",
            },
            part2: {
              title: "Five biggest collections",
            },
          },
          collectionCard: {
            you: "You",
            open: "Open Collection",
            delete: "Delete",
          },
          itemCard: {
            noTags: "No tags",
            open: "Open",
            delete: "Delete",
          },
          collections: {
            my: {
              notLogged: "You must be logged in to view your collections.",
              button1: "Sign In",
              button2: "Add Collection",
            },
            addCollection: {
              collectionType: "Collection type",
              titleInput: {
                title: "Title",
                placeholder: "Enter collection title here",
                error: "Enter title of collection.",
              },
              descriptionInput: {
                title: "Description",
                error: "Enter description of collection.",
              },
              imageInput: "Image",
              imageButton: "Upload Image",
              newCustomField: { text: "New custom field", button: "Add" },
              buttons: {
                cancel: "Cancel",
                next: "Next",
                previous: "Previous",
                done: "Done",
              },
              steps: {
                step1: "Select collection type",
                step2: "Describe the new collection",
                step3: "Add custom fields to items (optional)",
              },
            },
            addItem: "Add Item",
            noItems: "This collection doesn't have items.",
          },
          addItem: {
            title: "Describe item",
            cancel: "Cancel",
            done: "Done",
            titleInput: {
              title: "Title",
              placeholder: "Title of item...",
            },
            tagsInput: {
              title: "Tags",
              placeholder: "Enter a tag and press Enter...",
            },
          },
          signIn: {
            passwordInput: "Password",
            button: "Sign In",
            noAccount: {
              part1: "Don't have an account?",
              part2: "Create",
            },
            error: "Invalid credentials.",
          },
          signUp: {
            nameInput: "Full Name",
            passwordInput: "Password",
            confirmPasswordInput: "Confirm Password",
            button: "Sign Up",
            haveAccount: {
              part1: "Already have an account?",
              part2: "Sign in",
            },
          },
          itemPage: {
            input: "Leave a comment",
            button: "Add",
          },
          loader: "Loading...",
        },
      },
      ru: {
        translation: {
          sidebar: {
            home: "Главная",
            myCollections: "Мои коллекции",
            signIn: "Войти",
            signOut: "Выйти",
          },
          home: {
            part1: {
              title: "Недавно добавленные предметы",
              noItems: "За последние 24 часа новые предметы не добавлялись.",
            },
            part2: {
              title: "Пять крупнейших коллекций",
            },
          },
          collectionCard: {
            you: "Вы",
            open: "Открыть коллекцию",
            delete: "Удалить",
          },
          itemCard: {
            open: "Открыть",
            delete: "Удалить",
          },
          collections: {
            my: {
              notLogged:
                "Вы должны быть в системе, чтобы просматривать свои коллекции.",
              button1: "Войти",
              button2: "Добавить коллекцию",
            },
            addCollection: {
              collectionType: "Тип коллекции",
              titleInput: {
                title: "Название",
                placeholder: "Введите название коллекции",
              },
              descriptionInput: "Описание",
              imageInput: "Изображение",
              imageButton: "Загрузить изображение",
              newCustomField: {
                text: "Новое пользовательское поле",
                button: "Добавить",
              },
              buttons: {
                cancel: "Отмена",
                next: "Далее",
                previous: "Назад",
                done: "Готово",
              },
              steps: {
                step1: "Выберите тип коллекции",
                step2: "Опишите новую коллекцию",
                step3:
                  "Добавьте пользовательские поля к предметам (необязательно)",
              },
            },
            addItem: "Добавить предмет",
            noItems: "В этой коллекции нет предметов.",
          },
          addItem: {
            title: "Описание предмета",
            cancel: "Отмена",
            done: "Готово",
            titleInput: {
              title: "Название",
              placeholder: "Название предмета...",
            },
            tagsInput: {
              title: "Теги",
              placeholder: "Введите тег и нажмите Enter...",
            },
          },
          signIn: {
            passwordInput: "Пароль",
            button: "Войти",
            noAccount: {
              part1: "Нет аккаунта?",
              part2: "Создать",
            },
            error: "Неверные учетные данные.",
          },
          signUp: {
            nameInput: "Полное имя",
            passwordInput: "Пароль",
            confirmPasswordInput: "Подтверждение пароля",
            button: "Зарегистрироваться",
            haveAccount: {
              part1: "Уже есть аккаунт?",
              part2: "Войти",
            },
          },
          itemPage: {
            input: "Оставьте комментарий",
            button: "Добавить",
          },
          loader: "Загрузка...",
        },
      },
      kk: {
        translation: {
          sidebar: {
            home: "Басты бет",
            myCollections: "Менің коллекцияларым",
            signIn: "Кіру",
            signOut: "Шығу",
          },
          home: {
            part1: {
              title: "Жақында қосылған заттар",
              noItems: "Соңғы 24 сағат ішінде жаңа заттар қосылмады.",
            },
            part2: {
              title: "Бес үлкен коллекция",
            },
          },
          collectionCard: {
            you: "Сіз",
            open: "Коллекцияны ашу",
            delete: "Жою",
          },
          itemCard: {
            open: "Ашу",
            delete: "Жою",
          },
          collections: {
            my: {
              notLogged: "Коллекцияларыңызды көру үшін жүйеге кіруіңіз керек.",
              button1: "Кіру",
              button2: "Коллекция қосу",
            },
            addCollection: {
              collectionType: "Коллекция түрі",
              titleInput: {
                title: "Атауы",
                placeholder: "Коллекцияның атауын енгізіңіз",
              },
              descriptionInput: "Сипаттама",
              imageInput: "Сурет",
              imageButton: "Сурет жүктеу",
              newCustomField: { text: "Жаңа өрісті қосу", button: "Қосу" },
              buttons: {
                cancel: "Бас тарту",
                next: "Келесі",
                previous: "Алдыңғы",
                done: "Дайын",
              },
              steps: {
                step1: "Коллекция түрін таңдаңыз",
                step2: "Жаңа коллекцияны сипаттаңыз",
                step3: "Заттарға өрістерді қосу (міндетті емес)",
              },
            },
            addItem: "Зат қосу",
            noItems: "Бұл коллекцияда заттар жоқ.",
          },
          addItem: {
            title: "Затты сипаттау",
            cancel: "Бас тарту",
            done: "Дайын",
            titleInput: {
              title: "Атауы",
              placeholder: "Заттын атауы...",
            },
            tagsInput: {
              title: "Тегтер",
              placeholder: "Тег енгізіңіз және Enter түймесін басыңыз...",
            },
          },
          signIn: {
            passwordInput: "Құпия сөз",
            button: "Кіру",
            noAccount: {
              part1: "Тіркелгіңіз жоқ па?",
              part2: "Тіркелу",
            },
            error: "Қате куәліктер.",
          },
          signUp: {
            nameInput: "Толық аты-жөні",
            passwordInput: "Құпия сөз",
            confirmPasswordInput: "Құпия сөзді растау",
            button: "Тіркелу",
            haveAccount: {
              part1: "Тіркелгіңіз бар ма?",
              part2: "Кіру",
            },
          },
          itemPage: {
            input: "Пікір қалдырыңыз",
            button: "Қосу",
          },
          loader: "Жүктелуде...",
        },
      },
    },
  });

export default i18n;
