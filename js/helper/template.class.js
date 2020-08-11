export default class Template {

    static aayadiDetailedReport(length, breadth, siUnit, result) {

            return `The Aayadi calculation is a matrix of architecture and astrological calculations that 
            are done to check the energy suitability of the plot and its relationship with the owner. 
            It is made up of a set of six criteria: Aaya, Vyaya, Amsha, Nakshatra, Yoni and Vara-tithi, 
            which are applied to dimensions of the building and its astrological associations. Apart 
            from the above Aayadi Shadvarga (Aaya, Vyaya, Amsha, Nakshatra, Yoni and Vaar-tithi) criteria, 
            there are some other criteria like Dravya, Rina, Yoga, Ayu, Vash Mandal and Tarabala which also 
            help in assessing whether the specific qualities of a house are in harmony with the owner.
            <br>
            <br>
            <span class="heading">Your property dimensions are:</span>
            <br>
            <span class="heading">Length: </span> <span class="length">${length}</span> <span class="si-unit">${siUnit}</span>
            <br>
            <span class="heading">Breadth: </span> <span class="breadth">${breadth}</span> <span class="si-unit">${siUnit}</span>
            <br>
            <br>
            We are giving below the Aayadi calculations result for your property.
            
            <br>
            <br>
            <span class="aaya heading">Aaya:</span>
            <br>
            <span class="aaya desc">Aaya means income and should always be more than 
             vyaya or expenditure or rina or debt. The Aaya calculation for your layout 
             gives a value of ${result['aaya']['remainder']} which is ${result['aaya']['result']}.</span>
            <br>
            <br>
            <span class="vyaya heading">Vyaya:</span>
            <br>
            <span class="vyaya desc">Vyaya calculation indicates the potential of income
            relative to expenditure.
            The Vyaya calculation for your layout gives a value of ${result['vyaya']['remainder']} which is ${result['vyaya']['result']}.</span>
            <br>
            <br>
            
            <span class="yoni heading">Yoni:</span>
            <br>
            <span class="yoni desc">Yoni is an extrmely important calculation which is done
            for the land. It determines the direction of flow of energy (prana) of the land
            and the most auspicious orientation for the building.
            The Yoni calculation for your layout gives a value of ${result['yoni']['remainder']} which is ${result['yoni']['result']}.</span>
            <br>
            <br>
            <span class="tithi heading">Tithi:</span>
            <br>
            <span class="tithi desc">Tithi determines the date of thithi for construction of building
            and performing invocation of Vastu Purush.
            The Tithi calculation for your layout gives a value of ${result['tithi']['remainder']} which is ${result['tithi']['result']}.</span>
            <br>
            <br>
            <span class="vaara heading">Vaar:</span>
            <br>
            <span class="vaara desc">Vaar determines the further compatibility of the 
            property with owner and indicates the characterstics of the auspicious day
            of the beginning construction and performing invocation of Vastu Purush.
            The Vaar calculation for your layout gives a value of ${result['vara']['remainder']} which is ${result['vara']['result']}.</span>
            <br>
            <br>
            <span class="Nakshatra heading">Nakshatra:</span>
            <br>
            <span class="Nakshatra desc"></span>
            <br>
            <br>
            <span class="amsha heading">Amsha:</span>
            <br>
            <span class="amsha desc">Amsha determines the nature of the land and indicates the 
            amsha lord of the navamsha rashi.
            The Amsha calculation for your layout gives a value of ${result['amsha']['remainder']} which is ${result['amsha']['result']}.</span>
            <br>
            <br>
            <span class="aayu heading">Aayu:</span>
            <br>
            <span class="aayu desc"></span>
            <br>
            <br>
            Here is a summary of all the above given factors:
        <br>
        <br>
        <table >
        <tr>
            <th >Name</th>
            <th>Remainder</th>
            <th>Result</th>
        </tr>
        <tr>
            <td>${result['aaya']['name']}</td>
            <td>${result['aaya']['remainder']}</td>
            <td>${result['aaya']['result']}</td>
        </tr>
        <tr>
            <td>${result['vyaya']['name']}</td>
            <td>${result['vyaya']['remainder']}</td>
            <td>${result['vyaya']['result']}</td>
        </tr>
        <tr>
        <td>${result['yoni']['name']}</td>
        <td>${result['yoni']['remainder']}</td>
        <td>${result['yoni']['result']}</td>
    </tr>
    <tr>
            <td>${result['tithi']['name']}</td>
            <td>${result['tithi']['remainder']}</td>
            <td>${result['tithi']['result']}</td>
        </tr>
        <tr>
            <td>${result['vara']['name']}</td>
            <td>${result['vara']['remainder']}</td>
            <td>${result['vara']['result']}</td>
        </tr>
        <tr>
            <td>Nakshatra</td>
            <td>TBD</td>
            <td>TBD</td>
        </tr>
        <tr>
            <td>${result['amsha']['name']}</td>
            <td>${result['amsha']['remainder']}</td>
            <td>${result['amsha']['result']}</td>
        </tr>
        <tr>
            <td>AAYU</td>
            <td>TBD</td>
            <td>TBD</td>
        </tr>
        </table>
           `;
    }

    static aayadiSummeryReport(length, breadth, siUnit, result) {

        return `The Aayadi calculation is a matrix of architecture and astrological calculations that 
        are done to check the energy suitability of the plot and its relationship with the owner. 
        It is made up of a set of six criteria: Aaya, Vyaya, Amsha, Nakshatra, Yoni and Vara-tithi, 
        which are applied to dimensions of the building and its astrological associations. Apart 
        from the above Aayadi Shadvarga (Aaya, Vyaya, Amsha, Nakshatra, Yoni and Vaar-tithi) criteria, 
        there are some other criteria like Dravya, Rina, Yoga, Ayu, Vash Mandal and Tarabala which also 
        help in assessing whether the specific qualities of a house are in harmony with the owner.
        <br>
        <br>
        Your property dimensions are:
        <br>
        Length: <span class="length">${length}</span> <span class="si-unit">${siUnit}</span>
        <br>
        Breadth: <span class="breadth">${breadth}</span> <span class="si-unit">${siUnit}</span>
        <br>
        <br>       
        
        Here is a summary of all the above given factors:
        <br>
        <br>
        <table >
        <tr>
            <th >Name</th>
            <th>Remainder</th>
            <th>Result</th>
        </tr>
        <tr>
            <td>${result['aaya']['name']}</td>
            <td>${result['aaya']['remainder']}</td>
            <td>${result['aaya']['result']}</td>
        </tr>
        <tr>
            <td>${result['vyaya']['name']}</td>
            <td>${result['vyaya']['remainder']}</td>
            <td>${result['vyaya']['result']}</td>
        </tr>
        <tr>
        <td>${result['yoni']['name']}</td>
        <td>${result['yoni']['remainder']}</td>
        <td>${result['yoni']['result']}</td>
    </tr>
    <tr>
            <td>${result['tithi']['name']}</td>
            <td>${result['tithi']['remainder']}</td>
            <td>${result['tithi']['result']}</td>
        </tr>
        <tr>
            <td>${result['vara']['name']}</td>
            <td>${result['vara']['remainder']}</td>
            <td>${result['vara']['result']}</td>
        </tr>
        <tr>
            <td>Nakshatra</td>
            <td>TBD</td>
            <td>TBD</td>
        </tr>
        <tr>
            <td>${result['amsha']['name']}</td>
            <td>${result['amsha']['remainder']}</td>
            <td>${result['amsha']['result']}</td>
        </tr>
        <tr>
            <td>AAYU</td>
            <td>TBD</td>
            <td>TBD</td>
        </tr>
        </table>`;
}
}