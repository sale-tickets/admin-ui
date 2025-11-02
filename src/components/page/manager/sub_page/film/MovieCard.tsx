import type { MovieModel } from "@/model/movie"
import { AspectRatio, Badge, Button, Card, Group, Image, Stack, Text, Tooltip, useMantineTheme } from "@mantine/core"
import type React from "react"

interface MovieCardProps {
    movie?: MovieModel
    onClick?: (movie: MovieModel) => void
    categoryLabels?: Record<string, string>
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, categoryLabels = {} }) => {
    const theme = useMantineTheme();



    if (!movie) {
        return (
            <Card shadow="md" padding="lg" radius="md" className="h-full bg-gray-50">
                <Text c="dimmed" ta="center">
                    No movie data available
                </Text>
            </Card>
        )
    }

    return (
        <Card
            shadow="md"
            padding="lg"
            radius="md"
            className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onClick={() => onClick?.(movie)}
        >
            <Card.Section>
                <AspectRatio ratio={16 / 9} mx="md" mt="md">
                    <Image
                        src={movie.thumbnail || "/placeholder.svg"}
                        alt={movie.name}
                        fit="cover"
                        radius="md"
                        className="object-cover"
                    />
                </AspectRatio>
            </Card.Section>

            <Stack gap="xs" mt="md" className="flex-1">
                {/* Movie Title */}
                <Tooltip label={movie.name} position="top" multiline maw={300}>
                    <Text fw={600} c={theme.colors.white[0]} size="lg" className="line-clamp-2 text-base" lineClamp={2}>
                        {movie.name}
                    </Text>
                </Tooltip>

                {/* Description */}
                <Text size="sm" c="dimmed" className="line-clamp-3" lineClamp={3}>
                    {movie.description}
                </Text>

                {/* Categories */}
                <Group gap="xs" mt="auto" wrap="wrap">
                    {movie.categoryId && movie.categoryId.length > 0 ? (
                        movie.categoryId.slice(0, 3).map((categoryId) => (
                            <Badge key={categoryId} size="sm" variant="outline" color={theme.colors.primary[4]}>
                                {categoryLabels[categoryId] || categoryId}
                            </Badge>
                        ))
                    ) : (
                        <Badge size="sm" variant="light" color="gray">
                            No Category
                        </Badge>
                    )}
                    {movie.categoryId && movie.categoryId.length > 3 && (
                        <Badge size="sm" variant="light" color="gray">
                            +{movie.categoryId.length - 3} more
                        </Badge>
                    )}
                </Group>

                {/* Metadata */}
                {(movie.createdAt || movie.uuid) && (
                    <Group gap="xs" mt="xs">
                        {movie.createdAt && (
                            <Text size="xs" c="dimmed">
                                {new Date(movie.createdAt).toLocaleDateString()}
                            </Text>
                        )}
                        {movie.deletedAt && (
                            <Badge size="xs" color="red" variant="dot">
                                Deleted
                            </Badge>
                        )}
                    </Group>
                )}
            </Stack>
            <Button mt="sm">Chi tiết</Button>
        </Card>
    )
}