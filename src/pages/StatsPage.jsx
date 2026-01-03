import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js registrieren
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatsPage({ orders }) {
    
    // Daten vorbereiten: Wir zählen, wie oft welcher Kaffee in "orders" vorkommt
    const coffeeCounts = {};
    // (Simuliert, später kommen hier die echten "all orders" rein)
    // Wenn du orders als Prop übergibst, nutzen wir die. 
    // Für den Start nehmen wir Dummy-Daten, damit du das Chart siehst:
    const dataLabels = ["Espresso", "Cappuccino", "Latte", "Matcha", "Holy"];
    const dataValues = [12, 19, 3, 5, 2];

    const data = {
        labels: dataLabels,
        datasets: [
            {
                label: 'Verkaufte Tassen',
                data: dataValues,
                backgroundColor: 'rgba(212, 180, 131, 0.6)', // Deine Gold-Farbe
                borderColor: 'rgba(212, 180, 131, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'white' } },
            title: { display: true, text: 'Top Seller', color: 'white' },
        },
        scales: {
            y: { ticks: { color: 'white' }, grid: { color: '#444' } },
            x: { ticks: { color: 'white' }, grid: { color: '#444' } }
        }
    };

    return (
        <div className="page-content" style={{ padding: '20px', paddingTop: '80px', color: 'white' }}>
            <h1>Statistiken 🏆</h1>
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '10px' }}>
                <Bar options={options} data={data} />
            </div>
            <p style={{marginTop:'20px'}}>Hier siehst du bald deine echten Verkaufszahlen!</p>
        </div>
    );
}