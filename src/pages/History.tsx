
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { Book, Landmark, Construction, ImageIcon } from 'lucide-react';

const History = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero 
          backgroundImage="/lovable-uploads/da579815-7db1-4a99-baf5-d241d4fcc53c.png"
          title="The History of Milde Maerten" 
          subtitle="Discover the rich heritage of our monumental building in Middelburg"
          fullHeight={false}
        />
        
        {/* Introduction */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-medium mb-6 font-playfair text-center">A Significant Heritage</h2>
              <p className="text-lg text-muted-foreground mb-8">
                The Milde Maerten is one of Middelburg's most historically significant buildings, 
                with a rich past that spans several centuries. Located in the heart of Zeeland's 
                capital, this monumental structure has witnessed key moments in Dutch history 
                and stands today as a testament to the region's cultural heritage.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                <img 
                  src="/lovable-uploads/14c256fa-1d3d-42d8-9029-9c0b5d0bb551.png" 
                  alt="Historical view of Milde Maerten" 
                  className="rounded-lg shadow-md"
                />
                <div>
                  <h3 className="text-2xl font-playfair mb-4">Origins & Name</h3>
                  <p className="text-muted-foreground">
                    The name "Milde Maerten" (Gentle Martin) has its own story. According to local 
                    historians, it may refer to Saint Martin of Tours, known for his generosity and 
                    compassion. The building served various purposes throughout its history, from a 
                    merchant's residence to a gathering place for local notables.
                  </p>
                  <p className="text-muted-foreground mt-4">
                    The architectural style of the building reflects the prosperous trading history 
                    of Middelburg during the Dutch Golden Age, with its distinctive façade and 
                    traditional Zeeland construction techniques.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Historical Events */}
        <section className="section-padding bg-apple-silver">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <Book className="h-8 w-8 text-hotel-brown mr-3" />
                <h2 className="text-3xl md:text-4xl font-medium font-playfair">Notable Historical Events</h2>
              </div>
              
              <div className="space-y-12 mt-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-2xl font-playfair mb-4">The Orangist Incident</h3>
                  <p className="text-muted-foreground mb-4">
                    One of the most famous events connected to the Milde Maerten occurred during the 
                    political tensions between the Orangists and their opponents. Historical records 
                    mention that Orangists fired a small cannon at the House of Leeuwenburg in Middelburg, 
                    an event witnessed from the windows of the Milde Maerten. This incident highlights 
                    the building's position during pivotal moments in Dutch political history.
                  </p>
                  <p className="text-muted-foreground">
                    During this tumultuous period in Dutch history, Middelburg was a center of political 
                    activity, with the Milde Maerten often serving as a meeting place for those loyal to 
                    the House of Orange.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-2xl font-playfair mb-4">Survival Through Wars</h3>
                  <p className="text-muted-foreground mb-4">
                    The Milde Maerten miraculously survived the heavy bombing of Middelburg during World War II, 
                    when much of the city center was destroyed. While many surrounding buildings were damaged beyond 
                    repair, the Milde Maerten sustained only minor damage, preserving its historical integrity.
                  </p>
                  <p className="text-muted-foreground">
                    This survival has made it an even more precious monument, representing resilience and 
                    continuity amidst historical turmoil.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-2xl font-playfair mb-4">A Center of Trade</h3>
                  <p className="text-muted-foreground">
                    During the 17th and 18th centuries, when Middelburg was a key trading hub of the Dutch East 
                    India Company (VOC), the Milde Maerten was connected to wealthy merchants and traders. 
                    Documents suggest that some of its owners were involved in international commerce, 
                    bringing wealth and exotic goods to Zeeland.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Historical Sketches */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-10">
                <ImageIcon className="h-8 w-8 text-hotel-brown mr-3" />
                <h2 className="text-3xl md:text-4xl font-medium font-playfair">Historical Sketches & Images</h2>
              </div>
              
              <p className="text-center text-muted-foreground mb-10">
                Over the centuries, the Milde Maerten has been captured in various artworks, sketches, and later, 
                photographs. These visual records help us trace the evolution of the building.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="overflow-hidden rounded-lg shadow-md">
                  <img 
                    src="/lovable-uploads/70a83751-a5b6-48f6-9562-dda2ddc2d508.png" 
                    alt="Historical sketch of Milde Maerten" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-apple-silver">
                    <p className="text-sm font-medium">18th Century Sketch</p>
                    <p className="text-xs text-muted-foreground">From the Middelburg Archives</p>
                  </div>
                </div>
                
                <div className="overflow-hidden rounded-lg shadow-md">
                  <img 
                    src="/lovable-uploads/da579815-7db1-4a99-baf5-d241d4fcc53c.png" 
                    alt="19th Century painting of Milde Maerten" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-apple-silver">
                    <p className="text-sm font-medium">19th Century View</p>
                    <p className="text-xs text-muted-foreground">Artist's impression of the streetscape</p>
                  </div>
                </div>
                
                <div className="overflow-hidden rounded-lg shadow-md">
                  <img 
                    src="/lovable-uploads/14c256fa-1d3d-42d8-9029-9c0b5d0bb551.png" 
                    alt="Early 20th Century photograph" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-apple-silver">
                    <p className="text-sm font-medium">Early 20th Century</p>
                    <p className="text-xs text-muted-foreground">First photographic records</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Restoration */}
        <section className="section-padding bg-hotel-cream">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-10">
                <Construction className="h-8 w-8 text-hotel-brown mr-3" />
                <h2 className="text-3xl md:text-4xl font-medium font-playfair">Restoration & Preservation</h2>
              </div>
              
              <p className="text-center text-muted-foreground mb-10">
                The transformation of this historic monument into today's Hotel de Milde Maerten required 
                extensive restoration work, combining traditional craftsmanship with modern techniques.
              </p>
              
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-playfair mb-4">The Restoration Journey</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                  <div>
                    <h4 className="text-xl font-medium mb-3">Challenges Faced</h4>
                    <p className="text-muted-foreground">
                      When restoration began in the early 2000s, the building had suffered from years 
                      of neglect. Structural issues, water damage, and outdated systems all needed addressing. 
                      The greatest challenge was balancing authentic preservation with the requirements of 
                      a modern luxury hotel.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium mb-3">Authentic Materials</h4>
                    <p className="text-muted-foreground">
                      Wherever possible, original materials were preserved or matched with historically 
                      accurate replacements. Master craftsmen used traditional techniques for woodwork, 
                      plastering, and stone repairs, ensuring that modern interventions remained invisible.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-xl font-medium mb-3">Modern Integration</h4>
                    <p className="text-muted-foreground">
                      Modern amenities were carefully integrated to preserve the historical character. 
                      Climate control, plumbing, and electrical systems were installed discreetly behind 
                      original walls and floors. This delicate balance allows guests to enjoy modern 
                      comfort within authentic historical surroundings.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium mb-3">Ongoing Preservation</h4>
                    <p className="text-muted-foreground">
                      The Milde Maerten remains a protected monument, requiring continuous maintenance 
                      and care. A portion of hotel proceeds is dedicated to ongoing preservation efforts, 
                      ensuring that this piece of Dutch heritage will continue to stand for generations 
                      to come.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Visit Call to Action */}
        <section className="section-padding bg-hotel-brown text-white">
          <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto">
              <Landmark className="h-12 w-12 mx-auto mb-6 text-hotel-cream" />
              <h2 className="text-3xl md:text-4xl font-medium mb-6 font-playfair">Experience Living History</h2>
              <p className="text-lg mb-8">
                Today, as a boutique hotel, the Milde Maerten invites you to become part of its ongoing story. 
                Every stay contributes to the preservation of this irreplaceable monument.
              </p>
              <Link to="/booking" className="inline-block bg-white text-hotel-brown px-8 py-3 font-medium rounded hover:bg-hotel-cream transition-colors">
                Book Your Historic Stay
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default History;
