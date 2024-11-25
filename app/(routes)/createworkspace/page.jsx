"use client"
import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/config/firebaseConfig';
import { useAuth, useUser } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2Icon, SmilePlus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import uuid4 from 'uuid4';

function CreateWorkspace() {
    const [coverImage, setCoverImage] = useState('/cover.jpg'); // Default cover
    const [workspaceName, setWorkspaceName] = useState('Untitled Workspace'); // Default name
    const [emoji, setEmoji] = useState('😀'); // Default emoji
    const { user } = useUser();
    const { orgId } = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    /**
     * Validate and prepare workspace data
     */
    const validateWorkspaceData = () => {
        return {
            workspaceName: workspaceName?.trim() || 'Untitled Workspace',
            emoji: emoji || '😀', // Fallback emoji
            coverImage: coverImage || '/cover.jpg', // Fallback cover
            createdBy: user?.primaryEmailAddress?.emailAddress || 'unknown',
            id: Date.now(),
            orgId: orgId || user?.primaryEmailAddress?.emailAddress || 'unknown',
        };
    };

    /**
     * Create a new workspace and save it in the database
     */
    const OnCreateWorkspace = async () => {
        if (!workspaceName?.trim().length) {
            alert('Workspace name cannot be empty!');
            return;
        }

        setLoading(true);
        const workspaceId = Date.now();
        const workspaceData = validateWorkspaceData();

        try {
            // Save workspace
            await setDoc(doc(db, 'Workspace', workspaceId.toString()), workspaceData);

            // Create a new document within the workspace
            const docId = uuid4();
            await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
                workspaceId,
                createdBy: workspaceData.createdBy,
                coverImage: null,
                emoji: null,
                id: docId,
                documentName: 'Untitled Document',
                documentOutput: [],
            });

            // Initialize document output
            await setDoc(doc(db, 'documentOutput', docId.toString()), {
                docId,
                output: [],
            });

            router.replace(`/workspace/${workspaceId}/${docId}`);
        } catch (error) {
            console.error('Error creating workspace:', error);
            alert('Failed to create workspace. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-28">
            <div className="shadow-2xl rounded-xl">
                {/* Cover Image Picker */}
                <CoverPicker setNewCover={(v) => setCoverImage(v)}>
                    <div className="relative group cursor-pointer">
                        <h2 className="hidden absolute p-4 w-full h-full
                        items-center group-hover:flex
                        justify-center">Change Cover</h2>
                        <div className="group-hover:opacity-40">
                            <Image
                                src={coverImage}
                                width={400}
                                height={400}
                                className="w-full h-[180px] object-cover rounded-t-xl"
                                alt="Cover Image"
                            />
                        </div>
                    </div>
                </CoverPicker>

                {/* Workspace Creation Form */}
                <div className="p-12">
                    <h2 className="font-medium text-xl">Create a new workspace</h2>
                    <h2 className="text-sm mt-2">
                        This is a shared space where you can collaborate with your team.
                        You can always rename it later.
                    </h2>
                    <div className="mt-8 flex gap-2 items-center">
                        <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
                            <Button variant="outline">
                                {emoji ? emoji : <SmilePlus />}
                            </Button>
                        </EmojiPickerComponent>
                        <Input
                            placeholder="Workspace Name"
                            onChange={(e) => setWorkspaceName(e.target.value)}
                        />
                    </div>
                    <div className="mt-7 flex justify-end gap-6">
                        <Button
                            disabled={!workspaceName?.length || loading}
                            onClick={OnCreateWorkspace}
                        >
                            Create {loading && <Loader2Icon className="animate-spin ml-2" />}
                        </Button>
                        <Button variant="outline">Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateWorkspace;
