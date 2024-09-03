import sequelize from '../database/dbClientSequelize.js';
import { Activity, Booking, User, Category } from '../models/index.js';

async function seedDatabase() {
    try {
        const users = await User.bulkCreate([
            { user_id: 1, first_name: 'Alice', last_name: 'Martin', email: 'alice.martin@example.com', password: 'password123', role: 'user', created_at: '2024-08-15 10:20:30' },
            { user_id: 2, first_name: 'Bob', last_name: 'Dupont', email: 'bob.dupont@example.com', password: 'securepass456', role: 'user', created_at: '2024-08-16 14:50:12' },
            { user_id: 3, first_name: 'Charlotte', last_name: 'Dubois', email: 'charlotte.dubois@example.com', password: 'zombie789', role: 'user', created_at: '2024-08-17 09:35:50' },
            { user_id: 4, first_name: 'David', last_name: 'Leroy', email: 'david.leroy@example.com', password: 'undead321', role: 'user', created_at: '2024-08-18 12:25:30' },
            { user_id: 5, first_name: 'Elise', last_name: 'Moreau', email: 'elise.moreau@example.com', password: 'brains654', role: 'user', created_at: '2024-08-19 11:15:20' },
            { user_id: 6, first_name: 'François', last_name: 'Petit', email: 'francois.petit@example.com', password: 'walkingdead987', role: 'user', created_at: '2024-08-20 15:45:10' },
            { user_id: 7, first_name: 'Gabrielle', last_name: 'Roux', email: 'gabrielle.roux@example.com', password: 'escape1234', role: 'user', created_at: '2024-08-21 08:05:00' },
            { user_id: 8, first_name: 'Hugo', last_name: 'Schmitt', email: 'hugo.schmitt@example.com', password: 'scream567', role: 'user', created_at: '2024-08-22 17:30:45' },
            { user_id: 9, first_name: 'Inès', last_name: 'Bernard', email: 'ines.bernard@example.com', password: 'darknight678', role: 'user', created_at: '2024-08-23 13:15:25' },
            { user_id: 10, first_name: 'Julien', last_name: 'Dubois', email: 'julien.dubois@example.com', password: 'survivor890', role: 'user', created_at: '2024-08-24 09:45:15' },
            { user_id: 11, first_name: 'Admin', last_name: 'Parc', email: 'admin@zombieland.fr', password: 'c15df46f39e02b6590fd25ff798d9508cc7b5c0e40b191e969f805cdd111725bb5d93c9ab194e0beaa5a5b3571d0f4edb00a210ee81dccb6e9fe448c8825769f.2f31dbbd1b7f63653d9a077b377672ef', role: 'admin', created_at: '2024-08-24 09:45:15' },
        ]);
        
        const bookings = await Booking.bulkCreate([
            { booking_id: 1, date: '2024-09-01', status: 'confirmed', nb_tickets: 3, client_id: 1 },
            { booking_id: 2, date: '2024-09-02', status: 'canceled', nb_tickets: 4, client_id: 2 },
            { booking_id: 3, date: '2024-09-03', status: 'pending', nb_tickets: 2, client_id: 3 },
            { booking_id: 4, date: '2024-09-04', status: 'confirmed', nb_tickets: 5, client_id: 4 },
            { booking_id: 5, date: '2024-09-05', status: 'confirmed', nb_tickets: 1, client_id: 5 },
            { booking_id: 6, date: '2024-09-06', status: 'confirmed', nb_tickets: 3, client_id: 6 },
            { booking_id: 7, date: '2024-09-07', status: 'pending', nb_tickets: 2, client_id: 7 },
            { booking_id: 8, date: '2024-09-08', status: 'canceled', nb_tickets: 4, client_id: 8 },
            { booking_id: 9, date: '2024-09-09', status: 'confirmed', nb_tickets: 2, client_id: 9 },
            { booking_id: 10, date: '2024-09-10', status: 'confirmed', nb_tickets: 5, client_id: 10 },
            { booking_id: 11, date: '2024-09-11', status: 'pending', nb_tickets: 1, client_id: 3 },
            { booking_id: 12, date: '2024-09-12', status: 'canceled', nb_tickets: 3, client_id: 1 },
            { booking_id: 13, date: '2024-09-13', status: 'confirmed', nb_tickets: 4, client_id: 5 },
            { booking_id: 14, date: '2024-09-14', status: 'confirmed', nb_tickets: 2, client_id: 6 },
            { booking_id: 15, date: '2024-09-15', status: 'confirmed', nb_tickets: 3, client_id: 7 }
        ]);
        
        const activities = await Activity.bulkCreate([
            {
                activity_id: 0,
                name: 'Escape Room',
                description: "Plongez dans l'antre des zombies où chaque minute compte. Trouvez des indices et résolvez des énigmes pour vous échapper avant que les zombies ne se réveillent. Une aventure immersive remplie de suspense et de frissons vous attend, mettant à l'épreuve votre esprit et votre courage. Oserez-vous tenter l'expérience ?",
                description_short: "Échappez-vous avant le réveil des zombies !",
                minimal_age: 13,
                capacity: 8,
                x: 23,
                y: 35
            },
            {
                activity_id: 1,
                name: 'Haunted House',
                description: "Entrez dans la maison hantée la plus terrifiante que vous n'ayez jamais visitée. Chaque pièce réserve une surprise, chaque couloir cache une menace. Des spectres aux rires maléfiques aux esprits errants, affrontez vos plus grandes peurs dans un labyrinthe d'horreur. Survivrez-vous à cette aventure glaçante ?",
                description_short: "Explorez la maison hantée la plus terrifiante !",
                minimal_age: 16,
                capacity: 15,
                x: 88,
                y: 38
            },
            {
                activity_id: 2,
                name: 'Bloody Escape',
                description: "Vous avez été piégé dans une maison où le sang coule à flots. Avec le temps qui s'égrène rapidement, trouvez la sortie avant que le cauchemar ne vous engloutisse. Relevez le défi dans une course contre la montre pleine de surprises terrifiantes et d'énigmes sanglantes à résoudre. Ferez-vous partie des rares à survivre ?",
                description_short: "Échappez-vous d'une maison remplie de terreur sanglante !",
                minimal_age: 14,
                capacity: 10,
                x: 88,
                y: 19
            },
            {
                activity_id: 3,
                name: 'Horror Carnival',
                description: "Entrez dans le Carnaval de l'Horreur, un parc d'attractions où le rire se transforme en cri. Chaque manège vous plonge dans des frayeurs inimaginables, des clowns maléfiques aux illusions terrifiantes. Survivrez-vous aux attractions ou serez-vous la prochaine victime de ce carnaval diabolique ?",
                description_short: "Affrontez vos peurs au Carnaval de l'Horreur !",
                minimal_age: 15,
                capacity: 12,
                x: 70,
                y: 29
            },
            {
                activity_id: 4,
                name: 'Zombie City',
                description: "Zombie City vous plonge dans une épreuve ultime de survie en pleine ville envahie par des hordes de zombies affamés. Trouvez des indices, déjouez les pièges et échappez-vous des ruelles sombres et des égouts avant qu'il ne soit trop tard. Une heure pour sauver votre vie ou devenir une proie de plus pour les morts-vivants.",
                description_short: "Survivez à une ville envahie par des zombies affamés !",
                minimal_age: 18,
                capacity: 60,
                x: 35,
                y: 85
            },
            {
                activity_id: 5,
                name: 'Damned Path',
                description: "Le Chemin Maudit vous entraîne dans une aventure à travers une forêt sombre et inquiétante, où chaque pas peut être le dernier. Des créatures cauchemardesques rôdent dans l'ombre, prêtes à attaquer. Trouvez votre chemin ou devenez une légende terrifiante de plus de ce sentier maudit.",
                description_short: "Affrontez les dangers d'un sentier maudit !",
                minimal_age: 17,
                capacity: 20,
                x: 12,
                y: 69
            },
            {
                activity_id: 6,
                name: 'Zombie Apocalypse',
                description: "Préparez-vous pour l'Apocalypse Zombie ! Vous devez naviguer à travers des terrains infestés de zombies tout en cherchant des provisions et des armes pour survivre. Une expérience de survie intense qui mettra vos nerfs à rude épreuve. Serez-vous prêt à tout pour rester en vie ?",
                description_short: "Survivez à l'Apocalypse Zombie !",
                minimal_age: 16,
                capacity: 30,
                x: 88,
                y: 58
            },
            {
                activity_id: 7,
                name: 'Infected Lab',
                description: "Bienvenue dans le laboratoire infecté, un lieu sinistre où des expériences scientifiques ont mal tourné. Explorez les couloirs sombres et les salles abandonnées, mais faites attention : des créatures mutantes et des pièges mortels vous attendent à chaque coin. Trouvez l'antidote avant qu'il ne soit trop tard.",
                description_short: "Évitez les pièges dans le laboratoire infecté !",
                minimal_age: 15,
                capacity: 25,
                x: 12.8,
                y: 92
            },
            {
                activity_id: 8,
                name: 'Zombie Forest',
                description: "Dans la Forêt des Zombies, les arbres ne sont pas les seuls à surveiller. Des morts-vivants se cachent derrière chaque tronc et attendent leur prochaine victime. Avec seulement une lampe torche, traversez cette forêt sombre et menaçante. Trouverez-vous la sortie ou finirez-vous comme eux ?",
                description_short: "Traversez une forêt sombre infestée de zombies !",
                minimal_age: 16,
                capacity: 35,
                x: 50,
                y: 18
            },
            {
                activity_id: 9,
                name: 'Pandemic Panic',
                description: "Encore une épreuve d'évasion, mais cette fois, les zombies sont plus proches que jamais. Vous avez un temps limité pour découvrir les indices, déchiffrer les codes et ouvrir les portes avant que les zombies n'envahissent la pièce. Chaque seconde compte dans cette course contre la montre.",
                description_short: "Échappez-vous avant que les zombies n'entrent !",
                minimal_age: 14,
                capacity: 45,
                x: 80,
                y: 83
            },
            {
                activity_id: 10,
                name: 'Dead Zone',
                description: "Entrez dans la Dead Zone, une zone interdite où la mort et le danger sont omniprésents. Le terrain est jonché de pièges mortels, et les créatures qui rôdent sont toujours à l'affût. Trouvez votre chemin à travers cette terre désolée sans devenir une nouvelle victime. Seuls les plus braves survivront.",
                description_short: "Survivez dans la zone interdite de la Dead Zone.",
                minimal_age: 18,
                capacity: 40,
                x: 50,
                y: 70
            },
            {
                activity_id: 11,
                name: "Terror's Tower",
                description: "Montez la Tour de la Terreur, où chaque étage présente de nouveaux défis et des frayeurs encore plus grandes. Du sous-sol sombre aux hauteurs vertigineuses, chaque niveau vous confronte à vos pires cauchemars. Arriverez-vous au sommet ou succomberez-vous à la peur avant d'atteindre la fin ?",
                description_short: "Grimpez la Tour de la Terreur et défiez vos peurs !",
                minimal_age: 17,
                capacity: 50,
                x: 50,
                y: 50
            }
        ]);
        
        
        const categories = await Category.bulkCreate([
            { category_id: 0, name: 'Infernal Thrills' },
            { category_id: 1, name: 'Nightmare Terror' },
            { category_id: 2, name: 'Deadly Trials' },
            { category_id: 3, name: 'Extreme Survival' }
        ]);

        // Add associations using direct IDs or helper methods
        // For example, you can use setCategories on each activity
        await activities[0].setCategories([0]);
        await activities[1].setCategories([3]);
        await activities[2].setCategories([2]);
        await activities[3].setCategories([0]);
        await activities[4].setCategories([1]);
        await activities[5].setCategories([1]);
        await activities[6].setCategories([3]);
        await activities[7].setCategories([2]);
        await activities[8].setCategories([0]);
        await activities[9].setCategories([1]);
        await activities[10].setCategories([0]);
        await activities[11].setCategories([1]);

        // Synchronisation des séquences pour chaque table après insertion
        await sequelize.query(`SELECT setval(pg_get_serial_sequence('public.user', 'user_id'), COALESCE((SELECT MAX(user_id) FROM public.user) + 1, 1), false)`);
        await sequelize.query(`SELECT setval(pg_get_serial_sequence('booking', 'booking_id'), COALESCE((SELECT MAX(booking_id) FROM booking) + 1, 1), false)`);
        await sequelize.query(`SELECT setval(pg_get_serial_sequence('activity', 'activity_id'), COALESCE((SELECT MAX(activity_id) FROM activity) + 1, 1), false)`);
        await sequelize.query(`SELECT setval(pg_get_serial_sequence('category', 'category_id'), COALESCE((SELECT MAX(category_id) FROM category) + 1, 1), false)`);

    } catch (error) {
        console.error(`Une erreur est survenue pendant la création des données`, error);
    } finally {
        await sequelize.close();
    };
};

seedDatabase();