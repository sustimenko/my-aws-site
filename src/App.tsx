import { useState, useEffect } from 'react';
import { Authenticator, Button, Text, TextField, Heading, Flex, View, Grid, Card } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import '@aws-amplify/ui-react/styles.css';

// Инициализируем клиента для работы с данными
const client = generateClient<Schema>();

export default function App() {
  const [projects, setProjects] = useState<Array<Schema['Project']['type']>>([]);

  // Функция для получения списка проектов из облака
  useEffect(() => {
    const sub = client.models.Project.observeQuery().subscribe({
      next: ({ items }) => setProjects([...items]),
    });
    return () => sub.unsubscribe();
  }, []);

  // Функция добавления нового проекта
  async function createProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await client.models.Project.create({
      name: form.get("name") as string,
      description: form.get("description") as string,
    });
    (event.target as HTMLFormElement).reset();
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <View className="App" padding="20px">
          <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
            <Heading level={2}>Мои Проекты в AWS</Heading>
            <Button onClick={signOut} variation="link">Выйти ({user?.signInDetails?.loginId})</Button>
          </Flex>

          <Grid templateColumns="1fr 2fr" gap="20px">
            {/* Левая колонка: Форма создания */}
            <Card variation="elevated">
              <Heading level={4} marginBottom="10px">Новый проект</Heading>
              <Flex as="form" direction="column" onSubmit={createProject}>
                <TextField name="name" placeholder="Название" label="Название" labelHidden required />
                <TextField name="description" placeholder="Описание" label="Описание" labelHidden />
                <Button type="submit" variation="primary">Создать в Облаке</Button>
              </Flex>
            </Card>

            {/* Правая колонка: Список проектов */}
            <View>
              <Heading level={4} marginBottom="10px">Список из БД ({projects.length})</Heading>
              <Grid templateColumns="1fr 1fr" gap="10px">
                {projects.map((project) => (
                  <Card key={project.id} variation="outlined">
                    <Text fontWeight="bold">{project.name}</Text>
                    <Text fontSize="0.8rem" color="gray">{project.description || 'Нет описания'}</Text>
                    <Button 
                      marginTop="10px" 
                      size="small" 
                      variation="link" 
                      colorTheme="error"
                      onClick={() => client.models.Project.delete({ id: project.id })}
                    >
                      Удалить
                    </Button>
                  </Card>
                ))}
              </Grid>
            </View>
          </Grid>
        </View>
      )}
    </Authenticator>
  );
}
